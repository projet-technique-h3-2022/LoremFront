<script setup>
import { onMounted, ref } from 'vue';
import router from "@/router";
import UserMenuVue from '../components/UserMenu.vue';
import { postArticle, getArticleById, putArticle } from '../services/article'

const props = defineProps({
    articleId: {
        type: String,
        default: undefined
    }
})

const emit = defineEmits(['articleAdded'])

const title = ref("")
const image = ref("")
const content = ref("")

const errorMsg = ref([])

const checkForm = () => {
    let error = false
    if (title.value.length < 3) {
        errorMsg.value.push("The title must be at least 3 characters long")
        error = true
    }
    if (image.value.length < 2) {
        errorMsg.value.push("The image link must be at least 2 characters long")
        error = true
    }
    if (content.value.length < 50) {
        errorMsg.value.push("The content must be at least 50 characters long")
        error = true
    }
    return !error
}

const verb = ref(props.articleId ? "Edit" : "Create")

const saveArticle = async () => {
    if(!checkForm()) return
    errorMsg.value = []
    if(props.articleId) await putArticle({id: props.articleId, title: title.value, image: image.value, content: content.value})
    else await postArticle({title: title.value, image: image.value, content: content.value})
    emit('articleAdded')
}

onMounted(async () => {
    if(props.articleId == undefined) return
    const articleContent = await getArticleById(props.articleId)
    title.value = articleContent.title
    image.value = articleContent.image
    content.value = articleContent.content
})
</script>

<template>
    <div class="AddEditArticle">
        <h1>{{ verb }} an article</h1>
        <input type="text" name="title" id="title" placeholder="Title" class="title" v-model="title">
        <input type="text" name="imageLink" id="imageLink" placeholder="Image link" class="imageLink" v-model="image">
        <textarea name="content" id="content" placeholder="Article content" class="content" rows="6" v-model="content"></textarea>
        <div v-if="errorMsg.length > 0" class="alert alert-danger">
            <ul>
                <li v-for="(error, i) in errorMsg" :key="i">
                    {{error}}
                </li>
            </ul>
        </div>
        <button class="btn btn-success mt-2" @click="saveArticle">{{verb}} l'article</button>
    </div>
</template>

<style>
.AddEditArticle {
    display: flex;
    justify-content: center;
    flex-flow: column nowrap;
}
input.title, input.imageLink, textarea.content {
    margin-top: 2rem;
    font-size: 2rem;
    outline: none;
    background-color: transparent;
    border: 0px solid;
}
input.imageLink, textarea.content {
    font-size: 1.5rem;
}
</style>