import { createPost, deleteLike, getPostsByIdUserDB, insertLike, isLiked } from "../repositories/timeline.repository.js";
import { getPosts } from "../repositories/timeline.repository.js";
// import { getUserByIdFromDb } from "../repositories/users.repositories.js";

export async function publishLink(req, res) {
  try {
    const { url, content } = req.body;

    const session = res.locals.rows[0]; 
    const userId = session.userId; 
    
    await createPost(url, content, userId);

    res.status(201).send("Link publicado com sucesso!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Houve um erro ao publicar seu link");
  }
}
// export async function getUserbyId(req, res) {
//   try {
//     const { userId } = req.body;
//     const user = await getUserByIdFromDb(userId);

//     if (!user) {
//       return res.status(404).send({ message: 'Usuário não encontrado.' });
//     }
//     console.log(user);
//     return res.send(user);
//   } catch (error) {
//     return res.status(500).send({ message: error.message });
//   }
// }

export async function getAllPosts(req, res){
  try {
    const limit = 20;
    const posts = await getPosts(limit);
    return res.send(posts);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
}

export async function getAllPostsByUserId(req, res){
  const { id } = req.params;

  try {
   
    const userIdQuery = await getPostsByIdUserDB(id)

    if (userIdQuery.rows.length === 0) {
      return res.status(404).send("Este id não existe no banco de usuários");
    }

    const formattedUserId = userIdQuery.rows;
    res.send(formattedUserId);

  } catch (error) {
    console.log('Erro em getAllPostsByUserId', error);
    res.status(500).send(error)
  }
}


export async function like(req, res) {
  const userId = req.body.userId
  const postId = req.body.postId

  try {
    const isLikedPost = await isLiked(userId, postId)

    if(isLikedPost.rows.length === 0){

      await insertLike(userId, postId)
      return res.sendStatus(201)
    }

    await deleteLike(userId, postId)
    res.sendStatus(201)

  }catch(err){
    return res.status(500).send({ message: err.message });
  }
}