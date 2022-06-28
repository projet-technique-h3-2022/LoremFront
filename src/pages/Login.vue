<script setup>
import { ref } from "vue";
import router from "@/router";
import { login } from "@/services/authentication/Login.js";

const form = ref({
	email: {
		value: "",
		valid: false,
		error: false,
		error_message: "",
	},
	password: {
		value: "",
		valid: false,
		error: false,
		error_message: "",
	},
	response: ""
})

const saveForm = JSON.parse(JSON.stringify(form.value));

function checkForm(type = "", min = 0, max = 0){
	let elem
	let error = false

	if(type == "password")elem = form.value.password
	if(type == "email") elem = form.value.email

	if(type === "password"){
			if(elem.value.length < min){
			error = true
			elem.valid = false
			elem.error = true
			elem.error_message = `The password length must be greater than ${min} characters`
		}
		else if(elem.value.length >= max){
			error = true
			elem.valid = false
			elem.error = true
			elem.error_message = `The password length must be less than ${max} characters`
		}
		else{
			elem.valid = true
			elem.error = false
		}
	}
	else if(type === "email"){
		if(elem.value.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) == null){
			error = true
			elem.valid = false
			elem.error = true
			elem.error_message = "The email provided is not valid"
		}
		else if(elem.value.length >= 255){
			error = true
			elem.valid = false
			elem.error = true
			elem.error_message = "The email must be less than 255 characters"
		}
		else{
			elem.valid = true
			elem.error = false
		}
	}
	return !error;
}

async function sendForm(){
	let checkEmail = checkForm('email')
	let checkPw = checkForm('password', 6, 255)

	if(	checkEmail && checkPw ){
		let data = {
			email: form.value.email.value,
			password: form.value.password.value
		}
		form.value.response = await login(data)
		if(form.value.response.token) router.push({ name: "homepage" });
	}
}

function resetForm(){
	form.value = saveForm;
}

</script>

<template>
	<div>
		<div class="row justify-content-center">
			<div class="col-md-2 text-center">
				<h1>
					Login
				</h1>
				<hr>
			</div>
		</div>

		<!-- Signup form -->
		<div class="row justify-content-center mt-3">
			<div class="col-4">
				<div class="row justify-content-between">
	
					<div class="col-12 mt-3">
						<label class="form-label">Email</label>
	
						<input 
							type="email" 
							class="form-control" 
							:class="{ 'is-valid': form.email.valid ,'is-invalid': form.email.error }" 
							@focusout="checkForm('email')" 
							v-model="form.email.value" 
							data-input="email"
							required />
							
						<div class="invalid-feedback" v-show="form.email.error">
							{{form.email.error_message}}
						</div>
					</div>
	
					<div class="col-12 mt-3">
						<label class="form-label">Password</label>
	
						<input 
							type="password" 
							class="form-control" 
							:class="{ 'is-valid': form.password.valid ,'is-invalid': form.password.error }" 
							@focusout="checkForm('password', 6, 255)" 
							v-model="form.password.value"
							data-input="password" 
							required />
							
						<div class="invalid-feedback" v-show="form.password.error">
							{{form.password.error_message}}
						</div>
					</div>

					<div class="col-12 mt-4" v-show="form.response != ''">
						<div class="alert alert-danger">
							<ul class="m-0">
								<li>{{form.response}}</li>
							</ul>
						</div>
					</div>

					<div class="col-3 text-start mt-3">
						<button class="btn btn-secondary" @click="resetForm()" data-btn="btnReset">Reset</button>
					</div>
					
					<div class="col-3 text-end mt-3">
						<button class="btn btn-primary" @click="sendForm()" data-btn="btnLogin">Login</button>
					</div>
				</div>

			</div>
		</div>
	</div>
</template>