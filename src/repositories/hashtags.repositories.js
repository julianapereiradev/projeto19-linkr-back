import {db} from "../database/database.js"

export function getHashtagPostsDB(hashtag) {
  const query = `SELECT posts.id, posts.content, posts."userId", posts.url FROM posts
    WHERE hashtags LIKE '%${hashtag}%';`

  return db.query(query);
}

export async function getUserInfoDB(ids) {
  const query = `SELECT users.username, users."pictureUrl" FROM users
    WHERE id IN (${ids});`

  return db.query(query);
}

export function getTrendingHashtagsDB() {
  return db.query(`
    SELECT SPLIT_PART(hashtags, ' ', 1) AS hashtag
      FROM posts ORDER BY id DESC
      LIMIT 10;
  `);
}