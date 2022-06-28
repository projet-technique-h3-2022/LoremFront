<script setup>
import { ref } from "vue";
import router from "@/router";
import { signup } from "@/services/authentication/Signup.js";

const form = ref({
	lastname: {
		value: "",
		valid: false,
		error: false,
		error_message: "",
	},
	firstname: {
		value: "",
		valid: false,
		error: false,
		error_message: "",
	},
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
	repeatPassword: {
		value: "",
		valid: false,
		error: false,
		error_message: "",
	},
	role: {
		value: "",
		error: false,
		error_message: "",
	},
	response: ""
})

const saveForm = JSON.parse(JSON.stringify(form.value));

function checkForm(type = "", min = 0, max = 0){
	let elem
	let str = ""
	let error = false

	if(type === "lastname"){
		elem = form.value.lastname
		str = "The last name"
	} 
	if(type === "firstname"){
		elem = form.value.firstname
		str = "The first name"
	}
	if(type === "password"){
		elem = form.value.password
		str = "The password"
	}
	if(type === "email") elem = form.value.email
	if(type === "repeatPassword") elem = form.value.repeatPassword
	if(type === "role") elem = form.value.role

	if(type.match(/^(lastname|firstname|password)$/)){
			if(elem.value.length < min){
			error = true
			elem.valid = false
			elem.error = true
			elem.error_message = `${str} length must be greater than ${min} characters`
		}
		else if(elem.value.length >= max){
			error = true
			elem.valid = false
			elem.error = true
			elem.error_message = `${str} length must be less than ${max} characters`
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
	else if(type === "repeatPassword"){
		if(form.value.password.value !== elem.value || elem.value === ""){
			error = true
			elem.valid = false
			elem.error = true
			elem.error_message = `Passwords must be identical and not empty`
		}
		else{
			elem.valid = true
			elem.error = false
		}
	}
	else if(type === "role"){
		if(elem.value === ""){
			elem.error = true;
			elem.error_message = "Select a role"
			
		} 
		else elem.error = false;
	}

	return !error;
}

async function sendForm(){
	let checkLastName = checkForm('lastname', 2, 50)
	let checkFirstName = checkForm('firstname', 2, 50)
	let checkEmail = checkForm('email')
	let checkPw = checkForm('password', 6, 255)
	let checkRpw = checkForm('repeatPassword')
	let checkRole = checkForm('role')

	if(	checkLastName && checkFirstName && checkEmail && checkPw && checkRpw && checkRole ){
		let data = {
			firstname: form.value.firstname.value,
			lastname: form.value.lastname.value,
			email: form.value.email.value,
			password: form.value.password.value,
			role: form.value.role.value
		}
		form.value.response = await signup(data)
		if(form.value.response.email) router.push({ name: "login" });
	}
}

function resetForm(){
	form.value = JSON.parse(JSON.stringify(saveForm));
}

</script>

<template>
	<div>
		<div class="row justify-content-center">
			<div class="col-md-2 text-center">
				<h1>
					Signup
				</h1>
				<hr>
			</div>
		</div>

		<!-- Signup form -->
		<div class="row justify-content-center mt-3">
			<div class="col-4">
				<div class="row justify-content-between">

					<div class="col-12">
						<label class="form-label">Last name</label>
	
						<input 
							type="text" 
							class="form-control" 
							:class="{ 'is-valid': form.lastname.valid ,'is-invalid': form.lastname.error }" 
							@focusout="checkForm('lastname', 2, 50)" 
							v-model="form.lastname.value" 
							required />
	
						<div class="invalid-feedback" v-show="form.lastname.error">
							{{form.lastname.error_message}}
						</div>
					</div>
	
					<div class="col-12 mt-3">
						<label class="form-label">First name</label>
	
						<input 
							type="text" 
							class="form-control" 
							:class="{ 'is-valid': form.firstname.valid ,'is-invalid': form.firstname.error }" 
							@focusout="checkForm('firstname', 2, 50)" 
							v-model="form.firstname.value" 
							required />
							
						<div class="invalid-feedback" v-show="form.firstname.error">
							{{form.firstname.error_message}}
						</div>
					</div>
	
					<div class="col-12 mt-3">
						<label class="form-label">Email</label>
	
						<input 
							type="email" 
							class="form-control" 
							:class="{ 'is-valid': form.email.valid ,'is-invalid': form.email.error }" 
							@focusout="checkForm('email')" 
							v-model="form.email.value" 
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
							required />
							
						<div class="invalid-feedback" v-show="form.password.error">
							{{form.password.error_message}}
						</div>
					</div>
	
					<div class="col-12 mt-3">
						<label class="form-label">Pepeat password</label>
	
						<input 
							type="password" 
							class="form-control" 
							:class="{ 'is-valid': form.repeatPassword.valid ,'is-invalid': form.repeatPassword.error }" 
							@focusout="checkForm('repeatPassword')" 
							v-model="form.repeatPassword.value" 
							required />
							
						<div class="invalid-feedback" v-show="form.repeatPassword.error">
							{{form.repeatPassword.error_message}}
						</div>
					</div>

					<div class="col-12 mt-4">
						<div class="row justify-content-around">
							<div class="col-4 text-center">
								<button 
									class="btn w-100"
									:class="{'btn-outline-dark': (form.role.value == '' || form.role.value == 'editor') && !form.role.error, 'btn-success': form.role.value == 'author', 'btn-outline-danger': form.role.error }" 
									@click="form.role.value = 'author'; checkForm('role')">
									Author
								</button>
							</div>
							<div class="col-4 text-center">
								<button 
									class="btn w-100"
									:class="{'btn-outline-dark': (form.role.value == '' || form.role.value == 'author') && !form.role.error, 'btn-success': form.role.value == 'editor', 'btn-outline-danger': form.role.error }"
									@click="form.role.value = 'editor'; checkForm('role')">
									Editor
								</button>
							</div>
							<div class="text-danger text-center" v-show="form.role.error">
								{{form.role.error_message}}
							</div>
						</div>
					</div>

					<div class="col-12 alert alert-danger mt-3" v-show="form.response != ''">
							<ul class="m-0">
								<li>{{form.response}}</li>
							</ul>
					</div>

					<div class="col-3 text-start mt-3">
						<button class="btn btn-secondary" @click="resetForm()">Reset</button>
					</div>
					
					<div class="col-3 text-end mt-3">
						<button class="btn btn-primary" @click="sendForm()">Signin</button>
					</div>
				</div>

			</div>
		</div>
	</div>
</template>