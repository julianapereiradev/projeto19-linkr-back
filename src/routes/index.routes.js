import { Router } from "express";
import userRouter from "./users.routes.js";
import hashtagRouter from "./hashtags.routes.js";


const router = Router();

router.use(userRouter)
router.use(hashtagRouter);

export default router;