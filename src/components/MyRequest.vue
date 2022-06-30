<script setup>
import { ref } from "vue"
import { useAuthorPubReq } from "@/services/AuthorPublicationRequest.js"

const { getUserAuthorPubReq, authorCancelPubReq } = useAuthorPubReq()

const requests = ref([])
const res = ref("")

async function getData(){
    requests.value = await getUserAuthorPubReq()
}
async function deleteRequest(requestId){
    res.value = await authorCancelPubReq(requestId)
    console.log(res.value);
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
                    <th>Article title</th>
                    <th>Date of request</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="r in requests">
                    <td>{{r.id_article.title}}</td>
                    <td>{{r.id_group.title}}</td>
                    <td>{{r.requested_at}}</td>
                    <td><button class="btn btn-danger" @click="deleteRequest">Cancel</button></td>
                </tr>
            </tbody>
        </table>

        <div class="text-center mt-5" v-show="requests.length == 0">
            You don't have any pending publication requests
        </div>
    </div>
</template>