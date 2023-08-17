import { db } from "../database/database.js";

export async function createPost(url, content, userId) {
    const query = `
      INSERT INTO posts
      (url, content, "userId")
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [url, content, userId];
    try {
      const result = await db.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.log(error);
    }
}

export async function getPosts(limit = 20) {
    const query = 'SELECT posts.*, users."username", users."pictureUrl" FROM posts JOIN users ON users.id = posts."userId" ORDER BY "createdAt" DESC LIMIT $1';
    const result = await db.query(query, [limit]);
    return result.rows;
}

export async function isLiked(userId,postId){
  return db.query(`
    SELECT *
    FROM likes
    WHERE likes."postId" = $1
    AND likes."userId" = $2
  `, [postId, userId])
}

export async function insertLike(userId,postId){
  return db.query(`
    INSERT INTO likes
    ("userId", "postId")
    VALUES ($1, $2)
  `, [userId, postId])
}

export async function deleteLike(userId, postId){
  return db.query(`
    DELETE FROM likes
    WHERE "userId" = $1
    AND "postId" = $2 
  `, [userId, postId])
}