<script setup>
import { ref } from "vue";
import { useEditorPubReq } from "@/services/EditorPublicationRequest.js";

const { getUserEditorPubReq, editorAcceptPubReq, editorRefusePubReq} = useEditorPubReq();
const requests = ref([]);
const response = ref("");

async function getData(){
	requests.value = await getUserEditorPubReq();
}

async function accept(requestId){
	response.value = await editorAcceptPubReq(requestId)
	if(response.value.id_article){
		response.value = ""
		getData()
	}
}

async function refuse(requestId){
	response.value = await editorRefusePubReq(requestId)
	if(response.value.id_article){
		response.value = ""
		getData()
	}
}

getData();
</script>

<template>
	<div>
		<h3>Publication requests</h3>
		<div class="row mt-5">

			<!-- Error bloc, in case of an error during accept or refuse -->
			<div class="col-12 mx-3" v-show="response != ''">
					<div class="alert alert-danger">
							<ul class="m-0">
									<li>{{response}}</li>
							</ul>
					</div>
			</div>
			
			<div v-show="requests.length > 0">
				<table class="table">
					<thead>
						<tr>
							<th>Group</th>
							<th>Article</th>
							<th>Request Date</th>
							<th></th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="r in requests" class="align-middle">
							<td>{{r.id_group.title}}</td>
							<td>
								<a :href="'/readArticle/' + r.id_article._id" target="_blank">{{r.id_article.title}}</a>
							</td>
							<td>{{(new Date(r.requested_at)).toLocaleString()}}</td>
							<td>
								<button class="btn btn-success" @click="accept(r._id)" data-btn="btnAccept">Accept</button>
							</td>
							<td>
								<button class="btn btn-danger" @click="refuse(r._id)" data-btn="btnRefuse">Refuse</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="text-center" v-show="requests.length == 0">
				There are no publication requests concerning your groups
			</div>
		</div>
	</div>
</template>