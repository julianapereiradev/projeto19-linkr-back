import { Router } from "express";
import { validationSchema } from "../middlewares/validationSchema.js";
import { publishSchema } from "../schemas/publish.schema.js";
import { publishLink } from "../controllers/timeline.controllers.js";
import { validationAuth } from "../middlewares/validationAuth.js";

const timelineRouter = Router();

timelineRouter.post("/timeline", validationAuth, validationSchema(publishSchema), publishLink);

export default timelineRouter;