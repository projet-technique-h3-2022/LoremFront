<script setup>
import NavBar from "@/components/Navbar.vue";
import "@/services/interceptor"
import "bootstrap";
</script>

<template>
  <NavBar />
  <div class="container-fluid mt-3">
    <router-view />
  </div>
</template>

<style>
@import "bootstrap/dist/css/bootstrap.min.css";
</style>

