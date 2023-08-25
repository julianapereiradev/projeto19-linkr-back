import {db} from "../database/database.js"

export async function findUserByEmailDB(email) {
  return db.query(`SELECT * FROM users WHERE email=$1`, [email]);
}

export async function getUserByIdFromDb(userId) {
  const query = 'SELECT * FROM users WHERE id = $1';
  const result = await db.query(query, [userId]);
  return result.rows[0];
}

export async function signupDB(email, encryptedPassword, username, pictureUrl) {
    return await db.query(
      `INSERT INTO users (email, password, username, "pictureUrl") VALUES ($1, $2, $3, $4);`,
      [email, encryptedPassword, username, pictureUrl]
    );
}

export async function signinDB(userId, token) {
    return await db.query(`INSERT INTO sessions ("userId", token) VALUES ($1, $2)`, [userId, token]);
}

export async function getPictureUrlDB(userId) {
  return await db.query(`
  SELECT sessions."userId", sessions."token", users."pictureUrl", users."username" 
  FROM sessions
  JOIN users ON users.id = sessions."userId"
  WHERE "userId" = $1`, [userId]);
}

export async function logoutDB(token) {
    return await db.query(`DELETE FROM sessions WHERE token =$1`, [token]);
}

export async function searchByNameDB(name, str) {

  const query = `
    SELECT id, users."username", "pictureUrl"
      FROM users
      WHERE LOWER(username) LIKE LOWER($1) ${str}`

      console.log(query);

  return await db.query(query, [`%${name}%`]);
}

export async function getIdUserByToken(token){
  return db.query(`
  SELECT *
  FROM sessions 
  WHERE token =$1`, [token])
}

export async function isFollowingDB(followerId, followingId) {
  return db.query(`
    SELECT * FROM follows
      WHERE "followerId"=$1 AND "followingId"=$2;`, [followerId, followingId]
  );
}

export async function followDB(followerId, followingId) {
  return db.query(`
    INSERT INTO follows ("followerId", "followingId")
      VALUES ($1, $2);`, [followerId, followingId]
  );
}

export async function unfollowDB(followerId, followingId) {
  return db.query(`
    DELETE FROM follows
      WHERE "followerId"=$1 AND "followingId"=$2;`, [followerId, followingId]
  );
}

export async function getFollowedUsersDB(followerId) {
  return db.query(`
    SELECT "followingId" FROM follows
      WHERE "followerId"=$1`, [followerId]
  );
}