import axios from "axios";

export async function postArticle(article) {
  try {
    const result = await axios.post(import.meta.env.VITE_URL_API + "/article", {
      title: article.title,
      image: article.image,
      content: article.content,
    });
    console.log(result)
  } catch (err) {
    return err.response.data.error;
  }
}