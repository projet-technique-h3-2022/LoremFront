<script setup>
import UserMenuVue from '../components/UserMenu.vue';
import ArticleTableVue from '../components/ArticleTable.vue';

const headList = [
    { id: "title", label: "Title" },
    { id: "group", label: "Group" },
    { id: "status", label: "Status" },
]
const rows = [
    { title: "title 1", group: "group 1", status: "draft", actions: ["add", "edit"] },
    { title: "title 1", group: "group 1", status: "draft", actions: ["add", "publish"] },
    { title: "title 1", group: "group 1", status: "draft", actions: ["edit", "publish"] },
    { title: "title 1", group: "group 1", status: "draft", actions: ["add", "edit"] },
    { title: "title 1", group: "group 1", status: "draft", actions: ["publish"] },
    { title: "title 1", group: "group 1", status: "draft", actions: ["add", "delete"] },
]
// TODO : write a function that build the headList and row props correctly
</script>

<template>
    <div class="MyArticles">
        <div class="col-md-12 ms-5">
            <h3>My articles</h3>
            <button class="btn btn-primary mt-3">Add an article</button>
            <ArticleTableVue class="mt-5" :headList="headList" :rows="rows" />
        </div>
    </div>
</template>