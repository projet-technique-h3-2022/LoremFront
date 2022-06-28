<template>
    <div class="MyAccount">
        <div class="row mainRow">
            <div class="col-md-3 leftContent">
                <h3>Menu utilisateur</h3>
                <ul>
                    <li>Mon compte</li>
                    <li>Mes articles</li>
                    <li>Demande de publication</li>
                </ul>
                <div class="separator"></div>
            </div>
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

.mainRow ul {
    margin-top: 1.5rem;
    display: flex;
    flex-flow: column nowrap;
    gap: 1rem;
}

.mainRow li {
    list-style-type: none;
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
</style>