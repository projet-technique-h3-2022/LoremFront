import axios from "axios";
import { useUserStore } from "@/services/UserStore";
const { user } = useUserStore();

async function getUserEditorPubReq() {
  try {
    const result = await axios.get(import.meta.env.VITE_URL_API + "");
		return result.data;
  } catch (err) {
    return err;
    // return err.response.data.error;
  }
}

async function editorAcceptPubReq(requestId = 0){
	try {
    const result = await axios.get(import.meta.env.VITE_URL_API + "");
		return result.data;
  } catch (err) {
    return err;
    // return err.response.data.error;
  }
}

async function editorRefusePubReq(requestId = 0){
	try {
    const result = await axios.get(import.meta.env.VITE_URL_API + "");
		return result.data;
  } catch (err) {
    return err;
    // return err.response.data.error;
  }
}

export function useEditorPubReq() {
  return {
    getUserEditorPubReq,
		editorAcceptPubReq,
		editorRefusePubReq,
  };
}