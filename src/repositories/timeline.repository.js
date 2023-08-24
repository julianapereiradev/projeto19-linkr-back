import { db } from "../database/database.js";

export async function createPost(url, content, userId, hashtags) {
    const query = `
      INSERT INTO posts
      (url, content, "userId", hashtags)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [url, content, userId, hashtags];
    try {
      const result = await db.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.log(error);
    }
}

export async function getPosts(limit, offset, users) {
  const query = `
    SELECT posts.*, users."username", users."pictureUrl" 
      FROM posts
      JOIN users ON users.id = posts."userId"
      WHERE "userId" IN (${users})
      ORDER BY "createdAt" DESC
      LIMIT $1
      OFFSET $2`;

  const result = await db.query(query, [limit, offset]);
  return result.rows;
}


export async function getPostsByIdUserDB(userId) {
  return await db.query(`SELECT users."username", users."pictureUrl", posts.* FROM users LEFT JOIN posts ON users.id = posts."userId" WHERE users.id =$1;`, [userId])
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

export async function updatePostsDB(content, id) {
  return await db.query(`
    UPDATE posts
    SET content = $1
    WHERE id = $2 
  `, [content, id])
}

export async function selectLikesDB(postId){
  return db.query(`
     SELECT 
      likes."postId", COUNT("userId")
    FROM likes
    WHERE likes."postId" = $1
    GROUP BY likes."postId"
  `, [parseInt(postId)])
}

export async function userLikesDB(postId, userId){
  return db.query(`
    SELECT * 
    FROM likes
    WHERE likes."postId" = $1
    AND likes."userId" = $2 
  `, [parseInt(postId), userId])
}

export async function whoLikedDB(postId){
  return db.query(`
    SELECT
    users.username, users.id
    FROM likes
    JOIN users ON users.id = likes."userId"
    WHERE likes."postId" = $1
  `, [parseInt(postId)])
}

export async function selectPostByIdDB(id) {
  return await db.query(`SELECT * FROM posts WHERE id=$1`, [id]);
}

export async function deletePostByIdDB(id) {   
  return await db.query(`DELETE FROM posts WHERE id=$1`, [id]);
}
