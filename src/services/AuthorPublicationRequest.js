import axios from "axios";

async function getUserAuthorPubReq() {
  try {
    const result = await axios.get(import.meta.env.VITE_URL_API + "/request");
		return result.data;
  } catch (err) {
    return err.response.data.error;
  }
}

async function addPubReq(form){
	try {
    const result = await axios.post(import.meta.env.VITE_URL_API + "/request", {
    	id_article: form.id_article,
			id_group: form.id_group,
    });
		return result.data;
  } catch (err) {
    return err.response.data.error;
  }
}

async function authorCancelPubReq(requestId = 0){
	try {
    const result = await axios.delete(import.meta.env.VITE_URL_API + "/request/" + requestId + "/cancel");
		return result.data;
  } catch (err) {
    return err.response.data.error;
  }
}

export function useAuthorPubReq() {
  return {
    getUserAuthorPubReq,
		addPubReq,
		authorCancelPubReq,
  };
}