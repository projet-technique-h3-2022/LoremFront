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
                    <td class="text-end col-4" v-if="row.actions">
                        <button v-if="row.actions.includes('add')" class="btn btn-success ms-1">Ajouter</button>                    
                        <button v-if="row.actions.includes('edit')" class="btn btn-primary ms-1">Editer</button>                    
                        <button v-if="row.actions.includes('publish')" class="btn btn-success ms-1">Publier</button>                    
                        <button v-if="row.actions.includes('delete')" class="btn btn-danger ms-1">Supprimer</button>                    
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>