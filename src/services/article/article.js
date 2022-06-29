import axios from "axios";

export async function postArticle(article) {
  try {
    const result = await axios.post(import.meta.env.VITE_URL_API + "/article", {
      title: article.title,
      image: article.image,
      content: article.content,
    });
  } catch (err) {
    return err.response.data.error;
  }
}

export async function getArticlesByAuthor() {
  try {
    const result = await axios.get(import.meta.env.VITE_URL_API + "/user/articles");
    return result.data
  } catch (err) {
    return err.response.data.error;
  }
}