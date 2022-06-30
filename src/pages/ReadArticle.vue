<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getArticleById } from '../services/article';

const route = useRoute()
const articleId = ref("")
const article = ref({})
articleId.value = route.params.id

onMounted(async () => {
    article.value = await getArticleById(articleId.value)
})

</script>

<template>
    <div class="ReadArticle">
        <div class="articleImage">
            <img src="https://picsum.photos/1200/200" class="img-fluid" alt="..." />
            <h1 class="articleTitle">{{article.title}}</h1>
        </div>
        <div class="articleContent">
            <div class="row">
                <div class="col-md-3 leftContent">
                    <div>Publié le {{(new Date(article?.published_at)).toLocaleDateString()}}</div>
                    <div>Ecrit par {{article?.id_author?.firstname + " " + article?.id_author?.lastname}}</div>
                    <div>Paru dans le groupe {{article?.id_group?.title}}</div>
                </div>
                <div class="col-md-6 mainContent">
                    {{article.content}}
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.articleImage {
    position: relative;
    display: flex;
    justify-content: center;
}

img {
    max-height: 200px;
    width: 100%;
    object-fit: cover;
    /* filter: contrast(-100%); */
    /* backdrop-filter: blur(100px); */
}

.articleTitle {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    text-shadow: 0px 0px 10px black;
}

.articleContent {
    margin-top: 1rem;
}

.leftContent {
    display: flex;
    flex-flow: column nowrap;
    gap: 1rem;
}
</style>