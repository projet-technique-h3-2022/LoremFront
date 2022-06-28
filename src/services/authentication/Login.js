import axios from "axios";
import { useUserStore } from "@/services/UserStore";
const { UserLogin } = useUserStore();

export async function login(form) {
  try {
    const result = await axios.post(import.meta.env.VITE_URL_API + "/user/login", {
      email: form.email,
      password: form.password,
    });
    if (result.data.token) {
      UserLogin(result.data);
      return result.data;
    } 
    else return result.data;
  } catch (err) {
    return err.response.data.error;
  }
}