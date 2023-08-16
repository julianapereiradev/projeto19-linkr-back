import {db} from "../database/database.js"

export function getHashtagPostsDB(name) {
  return db.query(`
    SELECT * FROM posts WHERE 
      GROUP BY`, [name]
  );
} 