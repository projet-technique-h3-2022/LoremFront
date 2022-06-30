import axios from "axios";
import { useUserStore } from "@/services/UserStore";
const { user } = useUserStore();

async function getUserEditorPubReq() {
  try {
    const result = await axios.get(import.meta.env.VITE_URL_API + "/request");
		return result.data;
  } catch (err) {
    return err.response.data.error;
  }
}

async function editorAcceptPubReq(requestId = 0){
	try {
    const result = await axios.post(import.meta.env.VITE_URL_API + "/request/" + requestId + "/valid");
		return result.data;
  } catch (err) {
    return err.response.data.error;
  }
}

async function editorRefusePubReq(requestId = 0){
	try {
    const result = await axios.delete(import.meta.env.VITE_URL_API + "/request/" + requestId + "/refuse");
		return result.data;
  } catch (err) {
    return err.response.data.error;
  }
}

export function useEditorPubReq() {
  return {
    getUserEditorPubReq,
		editorAcceptPubReq,
		editorRefusePubReq,
  };
}