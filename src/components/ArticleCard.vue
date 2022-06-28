<script setup>
import { ref } from "@vue/reactivity";

// 'img' props can be null, and an image from picsum will be taken
defineProps({
    title: String,
    desc: String,
    img: String,
})
</script>

<template>
    <div class="ArticleCard">
        <div class="card mb-3">
            <div class="row no-gutters">
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">{{title}}</h5>
                        <p class="card-text">
                            {{desc}}
                        </p>
                        <p class="card-text">
                            <small class="text-muted">Last updated 3 mins ago</small>
                        </p>
                    </div>
                </div>
                <div class="col-md-4">
                    <img :src="(img) ? img : 'https://picsum.photos/300/300'" class="card-img" alt="..." />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

img {
    background-size: cover;
}
</style>