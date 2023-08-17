import { getTrendingHashtagsDB, getHashtagPostsDB, getPostsById } from "../repositories/hashtags.repositories.js";

export async function getTrendingHashtags(req, res) {
  try {
    const hashtags = await getTrendingHashtagsDB();
    res.status(200).send(hashtags);
  } catch (err) {
    return res.status(500).send(err);
  }
}

export async function getHashtagPosts(req, res) {
  const { hashtag } = req.params;

  try {
    const { rows: ids} = await getHashtagPostsDB(hashtag);
    const idsArr = ids.map(function (obj) { 
      return obj.id;
    });
    const {rows: [posts] } = await getPostsById(idsArr);
    res.status(200).send(posts);
  } catch (err) {
    return res.status(500).send(err);
  }
}