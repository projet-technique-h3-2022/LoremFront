<script setup>
import UserMenuVue from '../components/UserMenu.vue';
import ArticleTableVue from '../components/ArticleTable.vue';
import { getArticlesByAuthor } from '../services/article/article'
import { onMounted, onUnmounted, ref } from 'vue';

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

const getAllArticles = async () => await getArticlesByAuthor()

const buildRows = (articles) => {
    return articles.map((item, i) => ({id: item._id, title: item.title, group: "", status: item.published, actions: ["edit", (item.published_at) ? "publish" : "delete"]}))
}

onMounted(async () => {
    const articles = await getAllArticles()
    rows.value = buildRows(articles)
})

const editArticle = (ev) => emit('editArticle', ev)
</script>

<template>
    <div class="MyArticles">
        <div class="col-md-12">
            <h1>My articles</h1>
            <button class="btn btn-primary mt-3" @click="$emit('addArticle')">Add an article</button>
            <ArticleTableVue @edit="editArticle" class="mt-5" :headList="headList" :rows="rows" />
        </div>
    </div>
</template>