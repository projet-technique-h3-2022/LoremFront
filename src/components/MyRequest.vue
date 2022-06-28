<script setup>
import ArticleTableVue from '../components/ArticleTable.vue';

const headList = [
    { id: "title", label: "Titre" },
    { id: "group", label: "Groupe" },
    { id: "status", label: "Statut" },
]
const rows = [
    { title: "titre 1", group: "group 1", status: "draft", actions: ["add", "edit"] },
    { title: "titre 1", group: "group 1", status: "draft", actions: ["add", "publish"] },
    { title: "titre 1", group: "group 1", status: "draft", actions: ["edit", "publish"] },
    { title: "titre 1", group: "group 1", status: "draft", actions: ["add", "edit"] },
    { title: "titre 1", group: "group 1", status: "draft", actions: ["publish"] },
    { title: "titre 1", group: "group 1", status: "draft", actions: ["add", "delete"] },
]
</script>

<template>
    <div class="MyRequest">
        <h1>Mes demandes de publication</h1>
        <button class="btn btn-primary">Nouvelle demande</button>
        <ArticleTableVue class="mt-5" :headList="headList" :rows="rows" />
    </div>
</template>