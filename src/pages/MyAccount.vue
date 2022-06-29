<script setup>
import { ref } from "vue";
import UserInfo from "@/components/UserInfo.vue"
import UserMenuVue from '../components/UserMenu.vue';
import { useUserStore } from "@/services/UserStore";
import MyRequestVue from "../components/MyRequest.vue";
import MyGroupsVue from "../components/MyGroups.vue";
import MyArticlesVue from "../components/MyArticles.vue";
import EditorPublicationRequest from "../components/EditorPublicationRequest.vue";


const { user } = useUserStore();
const view = ref(0);

function changeView(n) { view.value = n }

</script>

<template>
    <div class="MyAccount">
        <div class="row mt-5 ms-3">
            <UserMenuVue @change-view="changeView"/>
            <div class="col-md-7 ms-5">

                <UserInfo v-if="view == 0"/>
                <MyArticlesVue v-if="view == 1" />
                <MyGroupsVue v-if="view == 2"/>
                <MyRequestVue v-if="view == 3" />
                <EditorPublicationRequest v-if="view == 4" /> <!-- request pour editor -->

            </div>
        </div>
    </div>
</template>

<style scoped>
.mainRow {
    margin-top: 3rem;
}
</style>