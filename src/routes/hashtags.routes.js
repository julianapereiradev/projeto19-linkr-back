import { Router } from "express";
import { validationAuth } from "../middlewares/validationAuth.js";
import { getHashtagPosts, getTrendingHashtags } from "../controllers/hashtags.controllers.js";

const hashtagRouter = Router();

hashtagRouter.get("/hashtag/:hashtag", validationAuth, getHashtagPosts);
hashtagRouter.get("/trending", validationAuth, getTrendingHashtags);

export default hashtagRouter;