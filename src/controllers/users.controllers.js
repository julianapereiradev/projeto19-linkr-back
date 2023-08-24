import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { findUserByEmailDB, getIdUserByToken, getPictureUrlDB, logoutDB, searchByNameDB, signinDB, signupDB, isFollowingDB, followDB, unfollowDB, getFollowedUsersDB } from "../repositories/users.repositories.js";


export async function signup(req, res) {
  const { email, password, username, pictureUrl } = req.body;

  try {
    const existEmail = await findUserByEmailDB(email);
    if (existEmail.rowCount > 0) {
      return res.status(409).send("Este email já existe!");
    }

    const encryptedPassword = bcrypt.hashSync(password, 10);

    signupDB(email, encryptedPassword, username, pictureUrl)

    res.status(201).send("Usuário Cadastrado");
  } catch (err) {
    console.log('Erro em signup', err);
    return res.status(500).send(err);
  }
}


export async function signin(req, res) {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmailDB(email);
    if (user.rowCount === 0) {
      return res.status(401).send("Este email não existe, crie uma conta");
    }

    const hashedPassword = user.rows[0].password;

    if (bcrypt.compareSync(password, hashedPassword)) {
      const token = uuid();

      await signinDB(user.rows[0].id, token)

      const pictureUrl = await getPictureUrlDB(user.rows[0].id)

      const lastPictureUrl = pictureUrl.rows[pictureUrl.rows.length - 1];

      const lastUsername = pictureUrl.rows[pictureUrl.rows.length - 1];

      const lastUserId = pictureUrl.rows[pictureUrl.rows.length - 1];

      res.status(200).send({ token: token, pictureUrl: lastPictureUrl.pictureUrl, username: lastUsername.username, lastuserId: lastUserId.userId });

    } else {
      res.status(401).send("Senha incorreta!");
    }
  } catch (err) {
    console.log('Erro em signin', err);
    return res.status(500).send(err);
  }
}


export async function logout(req, res) {
  const token = res.locals.rows[0].token;

  try {
    await logoutDB(token)
    res.status(204).send("Token removido!")

  } catch (err) {
    console.log('Erro em logout', err);
    res.status(500).send(err)
  }
}

export async function searchByName(req, res) {
  const { name } = req.params

  const userId = res.locals.userId;

  try {
    const followedUsers = await getFollowedUsersDB(userId);
    let str = "";
    for (let i = 0; i < followedUsers.rows.length; i++) {
      str += followedUsers.rows[i].followingId;
      str += ", ";
    }
    str = str.slice(0, -2);

    const users = await searchByNameDB(name, str)
    return res.send(users.rows)

  } catch (err) {
    console.log('Erro em searchByName', err);
    res.status(500).send(err)
  }
}

export async function getUserDataByToken(req, res) {

  const token = res.locals.rows[0].token

  try {
    const {rows: user} = await getIdUserByToken(token)
    res.status(200).send(user)

  } catch (err) {
    console.log('Erro em buscar o userId', err);
    res.status(500).send({ message: err })
  }
}

export async function followUser(req, res) {
  const { followerId, followingId }  = req.body;
 
  try {
    const isFollowing = await isFollowingDB(followerId, followingId);
    let final = "";

    if (isFollowing.rowCount === 0) {
      await followDB(followerId, followingId);
      final = "followed"
    }
    else {
      await unfollowDB(followerId, followingId);
      final = "unfollowed";
    }

    res.status(200).send(final);
    
   res.sendStatus(200)

  } catch (err) {
    console.log('Erro em followUser', err);
    res.status(500).send({ message: err })
  }
}