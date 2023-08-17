import {db} from "../database/database.js"

export function getPostsById(ids) {
  
  return db.query(`
    SELECT * FROM posts WHERE "postId" IN $1;`, [ids]
  );
} 

export function getHashtagPostsDB(hashtag) {
  return db.query(`
    SELECT hashtags."postId" FROM hashtags WHERE hashtag=$1;`, [hashtag]
  );
}

export function getTrendingHashtagsDB() {
  return db.query(`
    SELECT hashtags.hashtag
      FROM hashtags
      ORDER BY "useCount" DESC
      LIMIT 10;
  `);
}