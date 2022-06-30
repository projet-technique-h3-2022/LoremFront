<script setup>
import UserMenuVue from '../components/UserMenu.vue';
import ArticleTableVue from '../components/ArticleTable.vue';
import { getArticlesByAuthor, deleteArticleById } from '../services/article/article'
import { useGroups } from '../services/groups.js'
import { useAuthorPubReq } from '../services/AuthorPublicationRequest';
import { onMounted, onUnmounted, ref } from 'vue';

const { getAllGroups } = useGroups()
const { addPubReq } = useAuthorPubReq()

const emit = defineEmits(['editArticle'])

const headList = [
    { id: "title", label: "Title" },
    { id: "group", label: "Group" },
    { id: "status", label: "Status" },
]
// const rows = [
//     { title: "title 1", group: "group 1", status: "draft", actions: ["add", "edit"] },
//     { title: "title 1", group: "group 1", status: "draft", actions: ["add", "publish"] },
//     { title: "title 1", group: "group 1", status: "draft", actions: ["edit", "publish"] },
//     { title: "title 1", group: "group 1", status: "draft", actions: ["add", "edit"] },
//     { title: "title 1", group: "group 1", status: "draft", actions: ["publish"] },
//     { title: "title 1", group: "group 1", status: "draft", actions: ["add", "delete"] },
// ]

const rows = ref([])
const groups = ref([])
const selectedArticle = ref("")
const selectedGroup = ref("")

const getAllArticles = async () => await getArticlesByAuthor()

const buildRows = (articles) => {
    return articles.map((item, i) => ({ id: item._id, title: item.title, group: item.id_group?.title, status: item.published, actions: ["edit", "delete", (item.published == "not_published") && "publish"] }))
}

const refresh = async () => {
    const articles = await getAllArticles()
    rows.value = buildRows(articles)
}

onMounted(() => {
    refresh()
})

const editArticle = (ev) => emit('editArticle', ev)

const deleteArticle = async (id) => {
    await deleteArticleById(id)
    rows.value = rows.value.filter(item => item.id != id)
}

const showPublishModal = async (id) => {
    groups.value = await getAllGroups()
    selectedArticle.value = id
}

const publishArticle = async () => {
    const res = await addPubReq({id_article: selectedArticle.value, id_group: selectedGroup.value})
    refresh()
}
</script>

<template>
    <div class="MyArticles">
        <div class="col-md-12">
            <h1>My articles</h1>
            <button class="btn btn-primary mt-3" @click="$emit('addArticle')">Add an article</button>
            <ArticleTableVue @edit="editArticle" @delete="deleteArticle" @publish="showPublishModal" class="mt-5"
                :headList="headList" :rows="rows" />
        </div>
        <div class="modal fade" id="modalArticle" tabindex="-1" aria-labelledby="modalArticleLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalArticleLabel">Publish article to a group</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <h4>Select a group</h4>
                        <select class="form-select" aria-label="Select a group" v-model="selectedGroup" placeholder="Choose group">
                            <option v-for="(group, i) in groups" :key="i" :value="group._id">{{group.title}}</option>
                        </select>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" @click="publishArticle" class="btn btn-primary" data-bs-dismiss="modal" data-btn="btnAdd">Add</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>