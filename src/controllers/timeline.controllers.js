import { createPost, deleteLike, insertLike, isLiked, updatePostsDB } from "../repositories/timeline.repository.js";
import { getPosts } from "../repositories/timeline.repository.js";

export async function publishLink(req, res) {
  try {
    const { url, content } = req.body;

    const session = res.locals.rows[0];
    const userId = session.userId;

    const post = await createPost(url, content, userId);

    res.status(201).send("Link publicado com sucesso!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Houve um erro ao publicar seu link");
  }
}

export async function getAllPosts(req, res) {
  try {
    const limit = 20;
    const posts = await getPosts(limit);
    return res.send(posts);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
}

export async function like(req, res) {
  const userId = req.body.userId
  const postId = req.body.postId

  try {
    const isLikedPost = await isLiked(userId, postId)

    if (isLikedPost.rows.length === 0) {

      await insertLike(userId, postId)
      return res.sendStatus(201)
    }

    await deleteLike(userId, postId)
    res.sendStatus(201)

  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function updatePosts(req, res) {
  const {id: postId } = req.params
  const { content } = req.body

  try {
    console.log(postId)
    updatePostsDB(content, postId)

    res.sendStatus(200)

  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}