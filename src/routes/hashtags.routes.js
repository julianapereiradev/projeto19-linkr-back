import { Router } from "express";
import { validationAuth } from "../middlewares/validationAuth.js";
import { getHashtagPosts, getTrendingHashtags } from "../controllers/hashtags.controllers.js";

const hashtagRouter = Router();

hashtagRouter.get("/hashtag/:hashtag", getHashtagPosts);
hashtagRouter.get("/trending", getTrendingHashtags);

export default hashtagRouter;