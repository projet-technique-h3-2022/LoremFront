<script setup>
import { ref, computed } from "@vue/reactivity";
import ArticleCardVue from "@/components/ArticleCard.vue";
import { getPublishedArticles } from "@/services/article/article" 

const articles = ref([])

async function getData(){
    articles.value = await getPublishedArticles()
}

const filteredArticles = computed(() => {
  return articles.value.filter((art) => art.published === 'published');
});

getData();

</script>

<template>
    <div class="HomePage">
        <div class="row justify-content-center">
            <div class="col-md-11">
                <h1>Last published articles</h1>
                <hr>
            </div>
        </div>
        <div class="row justify-content-center mx-5" v-show="filteredArticles.length > 0">
            <div class="col-md-6" v-for="(article, i) in filteredArticles" :key="i">
            <router-link style="text-decoration: none; color: inherit;" :to="`/readArticle/${article._id}`">
                <ArticleCardVue :article="article" />                
            </router-link>
            </div>
        </div>

        <div class="row justify-content-center mx-5 pt-5 text-center"  v-show="filteredArticles.length == 0">
            <h3>There are no articles published at the moment.</h3>
        </div>
    </div>
</template>