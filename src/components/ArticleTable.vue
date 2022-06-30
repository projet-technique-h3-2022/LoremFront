<script setup>
import { ref } from 'vue';

// Component doc :
// Give a headList and rows props to make it functional, must be as much heads as keys in rows object and have the same id

const props = defineProps({
    headList: Array, // List of thead elements
    rows: Array,
})
</script>

<template>
    <div class="ArticleTable">
        <table class="table">
            <thead>
                <tr>
                    <th v-for="(head, i) in headList" :key="i">{{head.label}}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, i) in rows" :key="i">
                    <td v-for="(head, i) in headList" :key="i">{{row[head.id]}}</td>
                    <td class="text-end col-5" v-if="row.actions">
                        <button v-if="row.actions.includes('add')" @click="$emit('add', row.id)" class="btn btn-success ms-1">Add</button>                    
                        <button v-if="row.actions.includes('edit')" @click="$emit('edit', row.id)" class="btn btn-primary ms-1">Edit</button>                    
                        <button v-if="row.actions.includes('publish')" @click="$emit('publish', row.id)" class="btn btn-success ms-1" data-bs-toggle="modal" data-bs-target="#modalArticle">Publish</button>                    
                        <button v-if="row.actions.includes('delete')" @click="$emit('delete', row.id)" class="btn btn-danger ms-1">Delete</button>                    
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>