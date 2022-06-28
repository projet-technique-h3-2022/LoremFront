import axios from "axios";

export async function signup(form) {
  try {
    const result = await axios.post(import.meta.env.VITE_URL_API + "/user/register", {
    	firstname: form.firstname,
			lastname: form.lastname,
			email: form.email,
			password: form.password,
			role: form.role,
    });
    return result.data;
  } catch (err) {
    return err.response.data.error;
  }
}