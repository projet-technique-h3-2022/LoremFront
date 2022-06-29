<script setup>
import { useUserStore } from "@/services/UserStore";
const { user } = useUserStore();
</script>

<template>
    <div class="UserMenu col-md-3 leftContent">
        <h3>Menu utilisateur</h3>
        <ul class="mt-5 noselect">
            <li @click="$emit('changeView', 0)" class="listBtn">My informations</li>
            <li @click="$emit('changeView', 1)" v-show="user.role == 'author'" class="listBtn">My articles</li>
            <li @click="$emit('changeView', 2)" v-show="user.role == 'editor'" class="listBtn">My groups</li>
            <li @click="$emit('changeView', 3)" v-show="user.role == 'author'" class="listBtn">Publication requests</li>
            <li @click="$emit('changeView', 4)" v-show="user.role == 'editor'" class="listBtn">Publication requests</li>
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

.listBtn {
    cursor: pointer;
    transition: color .3s ease-in-out;
    font-size: 16pt;
}
.listBtn:hover {
    color: palevioletred;
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

.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}
</style>