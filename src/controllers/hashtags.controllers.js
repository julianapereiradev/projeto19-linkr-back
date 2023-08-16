import { getHashtagPostsDB } from "../repositories/hashtags.repositores";

export async function getHashtagPosts(req, res) {
  const { name } = req.params;

  try {
    const { rows: [posts] } = await getHashtagPostsDB(name);
    req.status(201).send(posts);
  } catch (err) {
    return res.status(500).send(err);
  }
}