<script setup>
import { ref } from 'vue';
import UserMenuVue from '../components/UserMenu.vue';

const groups = ref([
    { title: "group 1", desc: "Description group 1" },
    { title: "group 2", desc: "Description group 2" },
    { title: "group 3", desc: "Description group 3" },
])
</script>

<template>
    <div class="MyGroups">
        <div class="col-md-12 ms-5">
            <h3>My groups</h3>
            <button class="btn btn-primary mt-3">Add a group</button>
            <div class="mt-5">
                <div v-for="(group, i) in groups" :key="i" class="groupCard">
                    <div>{{ group.title }}</div>
                    <div>{{ group.desc }}</div>
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