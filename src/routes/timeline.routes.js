import { Router } from "express";
import { validationSchema } from "../middlewares/validationSchema.js";
import { publishSchema } from "../schemas/publish.schema.js";
import { like, publishLink, updatePosts } from "../controllers/timeline.controllers.js";
import { validationAuth } from "../middlewares/validationAuth.js";
import { getAllPosts } from "../controllers/timeline.controllers.js";

const timelineRouter = Router();

timelineRouter.post("/timeline", validationAuth, validationSchema(publishSchema), publishLink);
timelineRouter.get("/timeline", validationAuth, getAllPosts);
timelineRouter.post("/like", validationAuth, like);
timelineRouter.put("/posts/:id", validationAuth, updatePosts);


export default timelineRouter;