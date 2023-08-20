import { Router } from "express";
import { validationSchema } from "../middlewares/validationSchema.js";
import { publishSchema } from "../schemas/publish.schema.js";
import { getLikes, like, publishLink, updatePosts, getAllPostsByUserId, deletePostById } from "../controllers/timeline.controllers.js";
import { validationAuth } from "../middlewares/validationAuth.js";
import { getAllPosts } from "../controllers/timeline.controllers.js";

const timelineRouter = Router();

timelineRouter.post("/timeline", validationAuth, validationSchema(publishSchema), publishLink);
timelineRouter.get("/timeline", validationAuth, getAllPosts);
timelineRouter.post("/like", validationAuth, like);
timelineRouter.get("/like/:postId", validationAuth, getLikes)
timelineRouter.put("/posts/:id", validationAuth, updatePosts);
// timelineRouter.post("/timeline/user", validationAuth, getUserbyId);
timelineRouter.get("/user/:id", validationAuth, getAllPostsByUserId);
timelineRouter.delete("/posts/:id", validationAuth, deletePostById);

export default timelineRouter;