import axios from "axios";
// import { useUserStore } from "@/services/UserStore";
// const { user } = useUserStore();

async function getUserGroup() {
  try {
    const result = await axios.get(import.meta.env.VITE_URL_API + "/group/editor");
		return result.data;
  } catch (err) {
    return err.response.data.error;
  }
}

async function addUserGroup(form) {
  try {
    const result = await axios.post(import.meta.env.VITE_URL_API + "/group", {
    	title: form.title
    });
    return result.data;
  } catch (err) {
    return err.response.data.error;
  }
}

async function updateUserGroup(form) {
	console.log(form)
	// try {
  //   const result = await axios.put(import.meta.env.VITE_URL_API + "/group/" + form.id, {
  //   	title: form.title
  //   });
  //   return result.data;
  // } catch (err) {
  //   return err.response.data.error;
  // }
}

async function deleteUserGroup(groupId) {
	console.log(groupId)
	// try {
  //   const result = await axios.delete(import.meta.env.VITE_URL_API + "/group/" + groupId);
  //   return result.data;
  // } catch (err) {
  //   return err.response.data.error;
  // }
}



export function useGroups() {
  return {
    getUserGroup,
		addUserGroup,
		updateUserGroup,
		deleteUserGroup
  };
}