import axios from "axios";

export async function signup(form) {
  try {
    const result = await axios.post("https://projet-technique-h3-2022.herokuapp.com/api/v1/user/register", {
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