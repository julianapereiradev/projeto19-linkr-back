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
    const query = 'SELECT * FROM posts ORDER BY "createdAt" DESC LIMIT $1';
    const result = await db.query(query, [limit]);
    return result.rows;
}