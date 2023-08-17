import { getTrendingHashtagsDB, getHashtagPostsDB } from "../repositories/hashtags.repositores";

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
    const { rows: [postsIds] } = await getHashtagPostsDB(hashtag);
    const ids = postsIds.toString();
    const posts = await getPostsById(ids);
    res.status(200).send(posts);
  } catch (err) {
    return res.status(500).send(err);
  }
}