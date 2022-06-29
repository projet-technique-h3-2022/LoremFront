<script setup>
import { ref } from "@vue/reactivity";

defineProps({
    article: Object,
})
</script>

<template>
    <div class="ArticleCard">
        <div class="card mb-3">
            <div class="row no-gutters minHeight">
                <div class="col-md-8">
                    <div class="card-body h-100">
                                
                        <h5 class="card-title">{{article.title}}</h5>
                        <p class="card-text">
                            {{article.content.substring(0,255)+".."}}
                        </p>

                        <div class="row position-absolute bottom-0 pb-3 align-items-end">
                            <div class="col-12">
                                <p class="card-text">
                                    <small class="text-muted">Publication date : {{article.published_at}}</small>
                                </p>

                                <p class="card-text fs-6" v-if="article.id_group">
                                    Groupe : <span class="badge bg-info fs-6">{{article.id_group.title}}</span>
                                </p>

                            </div>
                        </div>
                        
                    </div>
                </div>
                <div class="col-md-4">
                    <img :src="(article.image) ? article.image : 'https://picsum.photos/300/300'" class="card-img" alt="..." />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

.minHeight{
    min-height: 240px;
}

img {
    object-fit: cover;
}
</style>