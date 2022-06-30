<script setup>
	import { useUserStore } from "@/services/UserStore";
	const { user } = useUserStore();
</script>

<template>
	<div>
		 <h3>Personnal informations</h3>

			<div class="row justify-content-center mt-5 mb-3">
				<div class="col-4 text-end"> <h4>Last Name</h4> </div>
				<div class="col-8">
					<input type="text" class="form-control" readonly :value="user.lastname">
				 </div>
			</div>
			<div class="row justify-content-center mb-3">
				<div class="col-4 text-end"> <h4>First Name</h4></div>
				<div class="col-8">
					<input type="text" class="form-control" readonly :value="user.firstname">
				</div>
			</div>
			<div class="row justify-content-center mb-3">
				<div class="col-4 text-end"> <h4>Email</h4></div>
				<div class="col-8">
					<input type="text" class="form-control" readonly :value="user.email">
				</div>
			</div>
			<div class="row justify-content-center">
				<div class="col-4 text-end"> <h4>Role</h4></div>
				<div class="col-8">
					<input type="text" class="form-control" readonly :value="user.role">
				</div>
			</div>
			
			
					<!-- <div class="userLastame">Prénom : John</div>
					<div class="userFirstame">Nom : Doe</div>
					<div class="userEmail">Email : JohnDoe@mail.com</div> -->
	</div>
</template>