<script setup>
import { ref } from "vue";
import UserInfo from "@/components/UserInfo.vue"
import UserMenuVue from '../components/UserMenu.vue';
import { useUserStore } from "@/services/UserStore";

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

            </div>
        </div>
    </div>
</template>

<style scoped>
.mainRow {
    margin-top: 3rem;
}
</style>