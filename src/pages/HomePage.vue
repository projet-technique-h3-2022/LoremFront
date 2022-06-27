<script setup>
import { ref } from "@vue/reactivity";
import ArticleCardVue from "../components/ArticleCard.vue";

const articles = ref([
    {title: "Lorem", desc: "Ispuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuum"},
    {title: "Lorem", desc: "Ispuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuum", img: "https://picsum.photos/400/400"},
    {title: "Lorem", desc: "Ispuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuum"},
    {title: "Lorem", desc: "Ispuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuum"},
    {title: "Lorem", desc: "Ispuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuum", img: "https://picsum.photos/400/400"},
    {title: "Lorem", desc: "Ispuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuum"},
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
                <ArticleCardVue  :title="article.title" :desc="article.desc" :img="article.img" />                
            </div>
        </div>
    </div>
</template>