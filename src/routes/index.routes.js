import { Router } from "express";
import userRouter from "./users.routes.js";
import hashtagRouter from "./hashtags.routes.js";
import timelineRouter from "./timeline.routes.js";

const router = Router();

router.use(userRouter);
router.use(timelineRouter);
router.use(hashtagRouter);

export default router;