import { getCommentsDB, insertCommentDB } from "../repositories/comment.repository.js"

export async function createComment(req, res){
    const {postId} = req.params
    const {comment} = req.body
    const {userId} = res.locals

    try{
        await insertCommentDB(userId, postId, comment)

        res.status(201).send('Comentário adicionado!')

    }catch (err) {
        return res.status(500).send({ message: err.message })
    }
}

export async function getComments(req, res){
    const {postId} = req.params

    try {
        const comments = await getCommentsDB(postId)

        res.send(comments.rows)
    }catch (err) {
        return res.status(500).send({ message: err.message })
    }
}