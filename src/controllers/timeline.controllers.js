import { createPost } from "../repositories/timeline.repository.js";

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
