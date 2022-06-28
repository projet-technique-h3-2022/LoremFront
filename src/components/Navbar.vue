<script setup></script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">
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
          <router-link to="/" class="nav-link">
            Groupes
          </router-link>
        </ul>

				<router-link :to="{ name: 'signup' }" class="btn btn-info me-1">
          Signup
        </router-link>

        <router-link to="/" class="btn btn-primary">
          Login
        </router-link>

      </div>
    </div>
  </nav>
</template>
