<script setup>
import { ref } from 'vue';
import UserMenuVue from '../components/UserMenu.vue';

const groups = ref([
    { title: "Groupe 1", desc: "Description groupe 1" },
    { title: "Groupe 2", desc: "Description groupe 2" },
    { title: "Groupe 3", desc: "Description groupe 3" },
])
</script>

<template>
    <div class="MyGroups">
        <div class="row mt-5 ms-3">
            <UserMenuVue />
            <div class="col-md-7 ms-5">
                <h3>Mes goupes</h3>
                <button class="btn btn-primary mt-3">Ajouter un groupe</button>
                <div class="mt-5">
                    <div v-for="(group, i) in groups" :key="i" class="groupCard">
                        <div>{{ group.title }}</div>
                        <div>{{ group.desc }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.groupCard {
    width: 100%;
    height: 5rem;
    margin-top: .5rem;
    background-color: palevioletred;
    padding: 1rem;
    border-radius: 5px;
    color: white;
    font-weight: bold;
}
</style>