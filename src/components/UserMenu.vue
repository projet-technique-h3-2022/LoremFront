<script setup>
import { useUserStore } from "@/services/UserStore";
const { user } = useUserStore();
</script>

<template>
    <div class="UserMenu col-md-3 leftContent">
        <h3>Menu utilisateur</h3>
        <ul>
            <li @click="$emit('changeView', 0)">My informations</li>
            <li @click="$emit('changeView', 1)" v-show="user.role == 'author'">My articles</li>
            <li @click="$emit('changeView', 1)" v-show="user.role == 'editor'">My groups</li>
            <li @click="$emit('changeView', 2)">Publication requests</li>
        </ul>
        <div class="separator"></div>
    </div>
</template>

<style scoped>
ul {
    margin-top: 1.5rem;
    display: flex;
    flex-flow: column nowrap;
    gap: 1rem;
}

li {
    list-style-type: none;
}

.leftContent {
    position: relative;
}

.separator {
    position: absolute;
    top: 0;
    right: 0;
    width: .5rem;
    height: 100%;
    border-radius: 5px;
    background-color: palevioletred;
}
</style>