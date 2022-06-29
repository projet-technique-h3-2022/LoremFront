<script setup>
import { ref } from 'vue';
import { useGroups } from "@/services/groups.js";
const { getUserGroup, addUserGroup, updateUserGroup, deleteUserGroup } = useGroups();

const groups = ref([])
const group = ref({})
const mode = ref("");
const form = ref({
	title: {
		value: "",
		valid: false,
		error: false,
		error_message: "",
	},
	response: ""
})

function setModal(m, g = null) {
    mode.value = m
    if(m === 'add') form.value.title.value = '';
    if(m === 'update'){
        group.value = g
        form.value.title.value = g.title;
    } 
}

async function getData(){ groups.value = await getUserGroup(); }

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

async function add(){
    if(checkForm()){
        let data = {
			title: form.value.title.value,
		}
        form.value.response = await addUserGroup(data)
        if(form.value.response.title){
            getData();
        } 
    }
}

async function update(){
    if(checkForm()){
        let data = {
            id: group.value._id,
			title: form.value.title.value,
		}
        form.value.response = await updateUserGroup(data)
        if(form.value.response.title){
            getData();
        } 
    }
}

async function deleteGroup(groupId){
    let res = await deleteUserGroup(groupId)
    if(res._id) getData();
}

getData();

</script>

<template>
    <div class="MyGroups">

        <div class="col-md-12 ms-5">
            <h3>My groups</h3>
            <button class="btn btn-primary mt-3" data-bs-toggle="modal" data-bs-target="#modalGroup" @click="setModal('add')">Add a group</button>
            <div class="mt-5" v-show="groups.length > 0">
                <div v-for="(g, i) in groups" :key="i" class="groupCard">
                    <div>{{ g.title }}</div>
                    <div>{{ g.desc }}</div>
                    <button class="btn btn-primary" @click="setModal('update', g)" data-bs-toggle="modal" data-bs-target="#modalGroup">Modify</button>
                    <button class="btn btn-danger" @click="deleteGroup(g._id)">Delete</button>
                </div>
            </div>

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
                        <button v-show="mode == 'add'" type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="add">Add</button>
                        <button v-show="mode == 'update'" type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="update">Update</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<style scoped>
.groupCard {
    width: 100%;
    height: 5rem;
    margin-top: .5rem;
    background-color: palevioletred;
    padding: 1rem;
    border-radius: 5px;
    color: white;
    font-weight: bold;
}
</style>