<script setup>
import { ref } from "vue";
import UserInfo from "@/components/UserInfo.vue"
import UserMenuVue from '../components/UserMenu.vue';
import { useUserStore } from "@/services/UserStore";
import MyRequestVue from "../components/MyRequest.vue";
import MyGroupsVue from "../components/MyGroups.vue";
import MyArticlesVue from "../components/MyArticles.vue";
import EditorPublicationRequest from "../components/EditorPublicationRequest.vue";
import AddEditArticleVue from "../components/AddEditArticle.vue";


const { user } = useUserStore();
const view = ref(0);
const articleId = ref("")

function changeView(n) { view.value = n }

const addArticle = () => {
    view.value = 5
    articleId.value = undefined
}
const editArticle = (id) => {
    view.value = 5
    articleId.value = id
}

</script>

<template>
    <div class="MyAccount">
        <div class="row mt-5 ms-3">
            <UserMenuVue @change-view="changeView" :view="view"/>
            <div class="col-md-7 ms-5">

                <UserInfo v-if="view == 0"/>
                <MyArticlesVue v-if="view == 1" @add-article="addArticle" @edit-article="editArticle" />
                <MyGroupsVue v-if="view == 2"/>
                <MyRequestVue v-if="view == 3" />
                <EditorPublicationRequest v-if="view == 4" />
                <AddEditArticleVue v-if="view == 5" @article-added="view = 1" :articleId="articleId" />

            </div>
        </div>
    </div>
</template>

<style scoped>
.mainRow {
    margin-top: 3rem;
}
</style>