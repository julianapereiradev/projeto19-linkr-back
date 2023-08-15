import {db} from "../database/database.js"

export async function findUserByEmailDB(email) {
  return db.query(`SELECT * FROM users WHERE email=$1`, [email]);
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

export async function logoutDB(token) {
    return await db.query(`DELETE FROM sessions WHERE token =$1`, [token]);
}