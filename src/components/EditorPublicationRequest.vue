<script setup>
import { ref } from "vue";
import { useEditorPubReq } from "@/services/EditorPublicationRequest.js";
const { getUserEditorPubReq, editorAcceptPubReq, editorRefusePubReq} = useEditorPubReq();


const requests = ref([]);

const response = ref({});

async function getData(){
	// requests.value = await getUserEditorPubReq();
}

async function accept(requestId){
	// response.value = await editorAcceptPubReq(requestId)
	getData()
}

async function refuse(requestId){
	// response.value = await editorRefusePubReq(requestId)
	getData()
}

getData();

</script>

<template>
	<div>
		<h3>Publication requests</h3>
		<div class="row mt-5">
			
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
						<tr v-for="r in requests">
							<td>{{r.group.title}}</td>
							<td>
								<a :href="'/readArticle/' + r.article.id" target="_blank">{{r.article.title}}</a>
							</td>
							<td>{{r.requested_at}}</td>
							<td>
								<button class="btn btn-success" @click="accept(r.id)" data-btn="btnAccept">Accept</button>
							</td>
							<td>
								<button class="btn btn-danger" @click="refuse(r.id)" data-btn="btnRefuse">Refuse</button>
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