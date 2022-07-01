<script setup>
import { ref } from "vue"
import { useAuthorPubReq } from "@/services/AuthorPublicationRequest.js"

const { getUserAuthorPubReq, authorCancelPubReq } = useAuthorPubReq()

const requests = ref([])
const response = ref("")

async function getData(){
    requests.value = await getUserAuthorPubReq()
}

async function deleteRequest(requestId){
    response.value = await authorCancelPubReq(requestId)
    if(response.value._id){
        response.value = '';
        getData()
    }
}

getData()
</script>

<template>
    <div class="MyRequest">
        <h1>My publication requests</h1>
        <table class="table mt-3" v-show="requests.length > 0">
            <thead>
                <tr>
                    <th>Article title</th>
                    <th>Group title</th>
                    <th>Date of request</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="r in requests">
                    <td>{{r.id_article.title}}</td>
                    <td>{{r.id_group.title}}</td>
                    <td>{{ (new Date(r.requested_at)).toLocaleString() }}</td>
                    <td><button class="btn btn-danger" @click="deleteRequest(r._id)" data-btn="btnCancel">Cancel</button></td>
                </tr>
            </tbody>
        </table>

        <div class="text-center mt-5" v-show="requests.length == 0">
            You don't have any pending publication requests
        </div>
    </div>
</template>