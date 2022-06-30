import axios from "axios";

async function getAllGroups() {
  try {
    const result = await axios.get(import.meta.env.VITE_URL_API + "/group");
		return result.data;
  } catch (err) {
    return err.response.data.error;
  }
}

// Return the list of group owned by the user
async function getUserGroup() {
  try {
    const result = await axios.get(import.meta.env.VITE_URL_API + "/group/editor");
		return result.data;
  } catch (err) {
    return err.response.data.error;
  }
}

// Add new group to the user
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

// Update a group owned by the user
async function updateUserGroup(form) {
	try {
    const result = await axios.put(import.meta.env.VITE_URL_API + "/group/" + form.id, {
    	title: form.title
    });
    return result.data;
  } catch (err) {
    return err.response.data.error;
  }
}

// Delete a group owned by the user
async function deleteUserGroup(groupId) {
	try {
    const result = await axios.delete(import.meta.env.VITE_URL_API + "/group/" + groupId);
    return result.data;
  } catch (err) {
    return err.response.data.error;
  }
}

// Export all functions
export function useGroups() {
  return {
    getAllGroups,
    getUserGroup,
		addUserGroup,
		updateUserGroup,
		deleteUserGroup
  };
}