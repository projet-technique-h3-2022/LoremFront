<script setup>
import { ref } from 'vue';
import { useGroups } from "@/services/groups.js";

const { getUserGroup, addUserGroup, updateUserGroup, deleteUserGroup } = useGroups();

const groups = ref([]) // List of groups owned by user
const group = ref({})  // Group to update
const mode = ref("");  // Mode for the modal : add or update

// Data for the form, handle errors and response
const form = ref({
	title: {
		value: "",
		valid: false,
		error: false,
		error_message: "",
	},
	response: ""
})

// Function to set modal mode : add or update
function setModal(m, g = null) {
    mode.value = m
    if(m === 'add') form.value.title.value = '';
    if(m === 'update'){
        group.value = g
        form.value.title.value = g.title;
    } 
}

// Function who call group service to get all groups
async function getData(){ groups.value = await getUserGroup(); }

// Function that validate the form
function checkForm(){
	let error = false

    if(form.value.title.value.length < 2){
        error = true
        form.value.title.valid = false
        form.value.title.error = true
        form.value.title.error_message = `The title length must be greater than 2 characters`
    }
    else{
        form.value.title.valid = true
        form.value.title.error = false
    }
	return !error;
}

// Function who call group service to add a group
async function add(){
    if(checkForm()){
        let data = {
			title: form.value.title.value,
		}
        form.value.response = await addUserGroup(data)
        if(form.value.response.title){
            form.value.response = ''
            form.value.title.valid = false
            getData();
        } 
    }
}

// Function who call group service to update a group
async function update(){
    if(checkForm()){
        let data = {
            id: group.value._id,
			title: form.value.title.value,
		}
        form.value.response = await updateUserGroup(data)

        if(form.value.response.title){
            form.value.response = ''
            form.value.title.valid = false
            getData();
        } 
    }
}

// Function who call group service to delete a group
async function deleteGroup(groupId){
    form.value.response = await deleteUserGroup(groupId)
    if(form.value.response.title){
        form.value.response = ''
        getData()
    }
}

// Lauch function getData
getData();

</script>

<template>
    <div class="MyGroups">

        <div class="col-md-12 ms-5">
            <h3>My groups</h3>
            <button class="btn btn-primary mt-3" data-bs-toggle="modal" data-bs-target="#modalGroup" @click="setModal('add')" data-btn="btnSetModalAdd">Add a group</button>

            <!-- Error bloc, in case of an error during add, update or delete -->
            <div class="col-12 mt-4" v-show="form.response != ''">
                <div class="alert alert-danger">
                    <ul class="m-0">
                        <li>{{form.response}}</li>
                    </ul>
                </div>
            </div>

            <!-- Table of groups -->
            <div class="mt-5" v-show="groups.length > 0">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>N° of Articles</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(g, i) in groups" :key="i" class="align-middle">
                            <td>{{ g.title }}</td>
                            <td>{{ g.articles.length }}</td>
                            <td>
                                <button 
                                    class="btn btn-primary" 
                                    @click="setModal('update', g)" 
                                    data-bs-toggle="modal" 
                                    data-bs-target="#modalGroup" 
                                    data-btn="btnSetModalUpdate">
                                    Modify
                                </button>
                            </td>
                            <td>
                                <button 
                                    class="btn btn-danger" 
                                    @click="deleteGroup(g._id)" 
                                    data-btn="btnDelete">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- When there is no group created by the user -->
            <div v-show="groups.length == 0" class="text-center">
                You haven't created any groups.
            </div>
        </div>

        <!-- Add and Modify Modal -->
        <div class="modal fade" id="modalGroup" tabindex="-1" aria-labelledby="modalGroupLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 v-show="mode == 'add'" class="modal-title" id="modalGroupLabel">Form : Add a group</h5>
                        <h5 v-show="mode == 'update'" class="modal-title" id="modalGroupLabel">Form : Modify a group</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div>
                            <label class="form-label">Title</label>
        
                            <input 
                                type="text" 
                                class="form-control" 
                                :class="{ 'is-valid': form.title.valid ,'is-invalid': form.title.error }" 
                                @focusout="checkForm()" 
                                v-model="form.title.value" 
                                data-input="title"
                                required />
        
                            <div class="invalid-feedback" v-show="form.title.error">
                                {{form.title.error_message}}
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button v-show="mode == 'add'" type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="add" data-btn="btnAdd">Add</button>
                        <button v-show="mode == 'update'" type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="update" data-btn="btnUpdate">Update</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>