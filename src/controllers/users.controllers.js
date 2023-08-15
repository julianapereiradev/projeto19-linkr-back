import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { findUserByEmailDB, logoutDB, signinDB, signupDB } from "../repositories/users.repositories.js";


export async function signup(req, res) {
  const { email, password, confirmPassword, username, pictureUrl } = req.body;

  try {

    if(password !== confirmPassword) {
      return res.status(422).send("As senhas estão diferentes!")
    }

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

      res.status(200).send({ token: token });
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