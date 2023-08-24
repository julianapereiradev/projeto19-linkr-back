import { getTrendingHashtagsDB, getHashtagPostsDB, getUserInfoDB } from "../repositories/hashtags.repositories.js";

export async function getTrendingHashtags(req, res) {
  try {
    const hashtags = await getTrendingHashtagsDB();
    res.status(200).send(hashtags.rows);
  } catch (err) {
    return res.status(500).send({ message: err });
  }
}

export async function getHashtagPosts(req, res) {
  const { hashtag } = req.params;

  try {
    const infos = await getHashtagPostsDB(hashtag);
    let str = "";
    for (let i = 0; i < infos.rows.length; i++) {
      str += infos.rows[i].userId;
      str += ", ";
    }
    str = str.slice(0, -2);
    const users = await getUserInfoDB(str);
    let arr = [];
    for (let i = 0; i < users.rows.length; i++) {
      let obj = {
        id: infos.rows[i].id,
        userId: infos.rows[i].userId,
        username: users.rows[i].username,
        pictureUrl: users.rows[i].pictureUrl,
        content: infos.rows[i].content,
        url: infos.rows[i].url
      }
      arr.push(obj);
    }
    res.status(200).send(arr);
  } catch (err) {
    return res.status(500).send({ message: err });
  }
}