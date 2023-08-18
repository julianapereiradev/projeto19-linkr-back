import { createPost, deleteLike, getPostsByIdUserDB, insertLike, isLiked, selectLikesDB, updatePostsDB, userLikesDB, whoLikedDB, getPosts } from "../repositories/timeline.repository.js";
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

export async function getAllPosts(req, res) {
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

    // if (userIdQuery.rows.length === 0) {
    //   return res.status(404).send("Este id não existe no banco de usuários");
    // }

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
  const { id: postId } = req.params
  const { content } = req.body

  try {
    console.log(postId)
    updatePostsDB(content, postId)

    res.sendStatus(200)

  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export async function getLikes(req, res) {
  const { postId } = req.params
  const userId = res.locals.userId
  let isLiked = false

  try {

    const likes = await selectLikesDB(postId)
    const userLikes = await userLikesDB(postId, userId)
    const whoLiked = await whoLikedDB(postId)

    if (likes.rows.length === 0) {
      return res.send([{
        postId: parseInt(postId),
        count: 0,
        isLiked: isLiked,
        whoLiked: `Seja o primeiro <br> a curtir!`
      }])
    }

    if (whoLiked.rows.length === 1) {
      if (userLikes.rows.length !== 0) {
        isLiked = true
        likes.rows[0].isLiked = isLiked
        likes.rows[0].whoLiked = 'Você'

        return res.send(likes.rows)
      } else {
        likes.rows[0].isLiked = isLiked
        likes.rows[0].whoLiked = `${whoLiked.rows[0].username}`

        return res.send(likes.rows)
      }
    }

    if (whoLiked.rows.length === 2) {
      if (userLikes.rows.length !== 0) {
        isLiked = true
        likes.rows[0].isLiked = isLiked

        let other
        if (whoLiked.rows[0].id === userId) {
          other = whoLiked.rows[1].username
        } else {
          other = whoLiked.rows[0].username
        }

        likes.rows[0].whoLiked = `Você e ${other}`

        return res.send(likes.rows)
      } else {
        likes.rows[0].isLiked = isLiked
        likes.rows[0].whoLiked = `${whoLiked.rows[0].username} e ${whoLiked.rows[1].username}`

        return res.send(likes.rows)
      }
    }

    if (whoLiked.rows.length > 2) {
      if (userLikes.rows.length !== 0) {
        isLiked = true
        likes.rows[0].isLiked = isLiked

        let other
        if (whoLiked.rows[0].id === userId) {
          other = whoLiked.rows[1].username
        } else {
          other = whoLiked.rows[0].username
        }

        likes.rows[0].whoLiked = `Você, ${other} e outras ${parseInt(likes.rows[0].count) - 2} pessoas`

        return res.send(likes.rows)
      } else {
        likes.rows[0].isLiked = isLiked
        likes.rows[0].whoLiked = `${whoLiked.rows[0].username}, ${whoLiked.rows[1].username} e outras ${parseInt(likes.rows[0].count) - 2} pessoas`

        return res.send(likes.rows)
      }
    }

  } catch (err) {
    return res.status(500).send({ message: err.message });
  }

}