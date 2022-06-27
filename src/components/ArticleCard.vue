<script setup>
import { ref } from "@vue/reactivity";
</script>

<template>
    <div class="ArticleCard">
        <div class="card mb-3">
            <div class="row no-gutters">
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">Article title</h5>
                        <p class="card-text">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam vel corporis sunt, voluptates laudantium distinctio a. Adipisci accusantium aliquam, voluptate repellendus nobis fuga error minima unde, quaerat sed iste veniam!
                        </p>
                        <p class="card-text">
                            <small class="text-muted">Last updated 3 mins ago</small>
                        </p>
                    </div>
                </div>
                <div class="col-md-4">
                    <img src="https://picsum.photos/300/300" class="card-img" alt="..." />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

.card {
    max-width: 50%;
    height: 10%;
}

img {
    background-size: cover;
}
</style>