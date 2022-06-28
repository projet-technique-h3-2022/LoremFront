<script setup>
import UserMenuVue from '../components/UserMenu.vue';
</script>

<template>
    <div class="MyAccount">
        <div class="row mt-5 ms-3">
            <UserMenuVue />
            <div class="col-md-7 ms-5">
                <h3>Mon compte</h3>
                <div class="row ms-5">
                    <div class="userLastame">Prénom : John</div>
                    <div class="userFirstame">Nom : Doe</div>
                    <div class="userEmail">Email : JohnDoe@mail.com</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.mainRow {
    margin-top: 3rem;
}
</style>