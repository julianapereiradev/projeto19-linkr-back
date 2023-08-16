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