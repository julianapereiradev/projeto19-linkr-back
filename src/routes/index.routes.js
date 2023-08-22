import { Router } from "express";
import userRouter from "./users.routes.js";
import timelineRouter from "./timeline.routes.js";
import commentsRouter from "./comment.routes.js";

const router = Router();

router.use(userRouter);
router.use(timelineRouter);
router.use(commentsRouter);

export default router;