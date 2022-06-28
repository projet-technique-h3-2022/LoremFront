<script setup>
  import { useUserStore } from "@/services/UserStore";
  import router from "@/router";

  const { user, logout } = useUserStore();

  function logoutUser() {
    logout();
    router.push({ name: "homepage" });
  }
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link :to="{ name: 'homepage' }" class="navbar-brand" >
        Lorem
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        </ul>

				<router-link v-if="!user" :to="{ name: 'signup' }" class="btn btn-info me-1">
          Signup
        </router-link>

        <router-link v-if="!user" :to="{ name: 'login' }" class="btn btn-primary">
          Login
        </router-link>

        <router-link v-if="user" :to="{ name: 'myAccount' }" class="btn btn-primary me-1">
          My Account
        </router-link>

        <button v-if="user" class="btn btn-danger" @click="logoutUser()">
          Logout
        </button>

      </div>
    </div>
  </nav>
</template>
