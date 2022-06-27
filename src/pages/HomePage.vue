<script setup>
import { ref } from "@vue/reactivity";
import ArticleCardVue from "../components/ArticleCard.vue";

const articles = ref([
    {id: 0, title: "Lorem", desc: "Ispuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuum"},
    {id: 1, title: "Lorem", desc: "Ispuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuum", img: "https://picsum.photos/400/400"},
    {id: 2, title: "Lorem", desc: "Ispuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuum"},
    {id: 3, title: "Lorem", desc: "Ispuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuum"},
    {id: 4, title: "Lorem", desc: "Ispuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuum", img: "https://picsum.photos/400/400"},
    {id: 5, title: "Lorem", desc: "Ispuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuum"},
])

</script>

<template>
    <div class="HomePage">
        <div class="row justify-content-center">
            <div class="col-md-11">
                <h1>Articles publiés récemment</h1>
                <hr>
            </div>
        </div>
        <div class="row justify-content-center mx-5">
            <div class="col-md-6" v-for="(article, i) in articles" :key="i">
            <router-link style="text-decoration: none; color: inherit;" :to="`/readArticle/${article.id}`">
                <ArticleCardVue :articleId="article.id" :title="article.title" :desc="article.desc" :img="article.img" />                
            </router-link>
            </div>
        </div>
    </div>
</template>