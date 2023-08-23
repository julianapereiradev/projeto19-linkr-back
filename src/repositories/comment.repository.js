import { db } from "../database/database.js";

export async function insertCommentDB(userId, postId, comment){
    return db.query(`
        INSERT INTO
        comments ("userId", "postId", "comment")
        VALUES ($1, $2, $3)
    `, [userId, postId, comment])
}

export async function getCommentsDB(postId){
    return db.query(`
        SELECT 
            c.*, 
            u.username as author,
            u."pictureUrl"
        FROM comments c
        JOIN users u ON u.id=c."userId"
        WHERE c."postId" = $1
        ORDER BY c.id ASC
    `, [postId])
}