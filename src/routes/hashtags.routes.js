import { Router } from "express";
import { validationAuth } from "../middlewares/validationAuth.js";
import { getHashtagByName } from "../controllers/hashtags.controllers.js";

const hashtagRouter = Router();
hashtagRouter.get("/hashtag/:hashtag", validationAuth, getHashtagByName);
