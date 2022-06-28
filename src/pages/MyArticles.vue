<script setup>
import UserMenuVue from '../components/UserMenu.vue';
import ArticleTableVue from '../components/ArticleTable.vue';

const headList = [
    {id: "title", label: "Titre"},
    {id: "group", label: "Groupe"},
    {id: "status", label: "Statut"},
]
const rows = [
    {title: "titre 1", group: "group 1", status: "draft", actions: ["add", "edit"]},
    {title: "titre 1", group: "group 1", status: "draft", actions: ["add", "publish"]},
    {title: "titre 1", group: "group 1", status: "draft", actions: ["edit", "publish"]},
    {title: "titre 1", group: "group 1", status: "draft", actions: ["add", "edit"]},
    {title: "titre 1", group: "group 1", status: "draft", actions: ["publish"]},
    {title: "titre 1", group: "group 1", status: "draft", actions: ["add", "delete"]},
]
// TODO : write a function that build the headList and row props correctly
</script>

<template>
    <div class="MyArticles">
        <div class="row mt-5 ms-3">
            <UserMenuVue />
            <div class="col-md-7 ms-5">
                <h3>Mes articles</h3>
                <button class="btn btn-primary mt-3">Ajouter un article</button>
                <ArticleTableVue class="mt-5" :headList="headList" :rows="rows" />
            </div>
        </div>
    </div>
</template>