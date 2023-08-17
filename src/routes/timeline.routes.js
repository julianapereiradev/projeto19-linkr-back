import { Router } from "express";
import { validationSchema } from "../middlewares/validationSchema.js";
import { publishSchema } from "../schemas/publish.schema.js";
import { getAllPostsByUserId, like, publishLink } from "../controllers/timeline.controllers.js";
import { validationAuth } from "../middlewares/validationAuth.js";
import { getAllPosts } from "../controllers/timeline.controllers.js";

const timelineRouter = Router();

timelineRouter.post("/timeline", validationAuth, validationSchema(publishSchema), publishLink);
timelineRouter.get("/timeline", validationAuth, getAllPosts);
// timelineRouter.post("/timeline/user", validationAuth, getUserbyId);
timelineRouter.get("/user/:id", validationAuth, getAllPostsByUserId);
timelineRouter.post("/like", like)


export default timelineRouter;