import { ref } from "vue";

const user = ref(null);

function UserLogin(data) {
	user.value = {
		id: data.id,
		lastname: data.lastname,
		firstname: data.firstname,
		email: data.email,
		token: data.token,
	}
  localStorage.setItem("user", JSON.stringify(user.value));
}

function logout() {
  user.value = null;
  localStorage.removeItem("user");
}

export function useUserStore() {
  return {
    user,
    UserLogin,
    logout,
  };
}
