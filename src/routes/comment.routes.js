import { Router } from "express"
import { validationAuth } from "../middlewares/validationAuth.js"
import { createComment, getComments } from "../controllers/comment.controllers.js"

const commentsRouter = Router()

commentsRouter.post('/post/:postId/comment', validationAuth, createComment)
commentsRouter.get('/post/:postId/comments', getComments)

export default commentsRouter
