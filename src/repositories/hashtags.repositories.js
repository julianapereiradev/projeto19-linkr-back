import {db} from "../database/database.js"

export function getPostsById(ids) {
  return db.query(`
    SELECT content, "userId" FROM posts WHERE id IN (${ids});`
  );
}

export function getHashtagPostsDB(hashtag) {
  return db.query(`
    SELECT "postId" FROM hashtags WHERE hashtag=$1;`, [hashtag]
  );
}

export function getTrendingHashtagsDB() {
  return db.query(`
    SELECT hashtag
      FROM hashtags
      ORDER BY "useCount" DESC
      LIMIT 10;
  `);
}