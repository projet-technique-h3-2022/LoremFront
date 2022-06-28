import Signup from '@/pages/Signup.vue'
import { mount } from '@vue/test-utils'
import { describe, it } from 'vitest';
import { rest } from "msw";
import { setupServer } from "msw/node";

async function sleep(durée){
  return new Promise((r) => setTimeout(r, durée));
}

const mockedServer = setupServer(
  rest.post(
    import.meta.env.VITE_URL_API + "/user/register",
    (req, res, ctx) => {
      return res(
        ctx.json({lastname: "test", firstname: "test", email: "test@test.fr"})
      );
    }
  )
);

describe("Signup page", () => {

	const wrapper = mount(Signup);
	const initalForm = JSON.parse(JSON.stringify(wrapper.vm.form))

	it("Render title and label", () => {
		const [h1] = wrapper.findAll('h1');
		const [labelLastName, labelFirstName, labelEmail, labelPw, labelRpw] = wrapper.findAll('label');

		expect(h1.text()).toMatch(/Signup/);
		expect(labelLastName.text()).toMatch(/Last name/);
		expect(labelFirstName.text()).toMatch(/First name/);
		expect(labelEmail.text()).toMatch(/Email/);
		expect(labelPw.text()).toMatch(/Password/);
		expect(labelRpw.text()).toMatch(/Repeat password/);
	});

	it("Render button", () => {
		const [btnAuthor, btnEditor, btnReset, btnSignup] = wrapper.findAll('button');

		expect(btnAuthor.text()).toMatch(/Author/);
		expect(btnEditor.text()).toMatch(/Editor/);
		expect(btnReset.text()).toMatch(/Reset/);
		expect(btnSignup.text()).toMatch(/Signup/);
	});

	describe("Validation", () => {
		describe("LastName input", () => {
			it("Invalid : Minimum length", async () => {
				const inputLastName = wrapper.find('[data-input="lastname"]');
				await inputLastName.setValue('a')
				inputLastName.trigger("focusout");
				expect(wrapper.vm.form.lastname.error).toBe(true);
			});

			it("Invalid : Maximum length", async () => {
				const inputLastName = wrapper.find('[data-input="lastname"]');
				await inputLastName.setValue('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
				inputLastName.trigger("focusout");
				expect(wrapper.vm.form.lastname.error).toBe(true);
			});

			it("Valid", async () => {
				const inputLastName = wrapper.find('[data-input="lastname"]');
				await inputLastName.setValue('test')
				inputLastName.trigger("focusout");
				expect(wrapper.vm.form.lastname.error).toBe(false);
				expect(wrapper.vm.form.lastname.valid).toBe(true);
			});
		})

		describe("FirstName input", () => {
			it("Invalid : Minimum length", async () => {
				const inputFirstName = wrapper.find('[data-input="firstname"]');
				await inputFirstName.setValue('a')
				inputFirstName.trigger("focusout");
				expect(wrapper.vm.form.firstname.error).toBe(true);
			});

			it("Invalid : Maximum length", async () => {
				const inputFirstName = wrapper.find('[data-input="firstname"]');
				await inputFirstName.setValue('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
				inputFirstName.trigger("focusout");
				expect(wrapper.vm.form.firstname.error).toBe(true);
			});

			it("Valid", async () => {
				const inputFirstName = wrapper.find('[data-input="firstname"]');
				await inputFirstName.setValue('test')
				inputFirstName.trigger("focusout");
				expect(wrapper.vm.form.firstname.error).toBe(false);
				expect(wrapper.vm.form.firstname.valid).toBe(true);
			});
		})

		describe("Email input", () => {

			it.each([
				"test",
				"test@test",
				"test@test.",
				"@test.",
				"@.",
			])('Invalid email : %s', async (value) => {
				const inputEmail = wrapper.find('[data-input="email"]');
				await inputEmail.setValue(value)
				inputEmail.trigger("focusout");
				expect(wrapper.vm.form.email.error).toBe(true)
			})

			it("Invalid : Maximum length", async () => {
				const inputEmail = wrapper.find('[data-input="email"]');
				await inputEmail.setValue('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA@test.fr')
				inputEmail.trigger("focusout");
				expect(wrapper.vm.form.email.error).toBe(true);
			});

			it("Valid", async () => {
				const inputEmail = wrapper.find('[data-input="email"]');
				await inputEmail.setValue('test@test.fr')
				inputEmail.trigger("focusout");
				expect(wrapper.vm.form.email.error).toBe(false);
				expect(wrapper.vm.form.email.valid).toBe(true);
			});
			
		})

		describe("Password input", () => {
			it("Invalid : Minimum length", async () => {
				const inputPw = wrapper.find('[data-input="password"]');
				await inputPw.setValue('test')
				inputPw.trigger("focusout");
				expect(wrapper.vm.form.password.error).toBe(true);
			});

			it("Invalid : Maximum length", async () => {
				const inputPw = wrapper.find('[data-input="password"]');
				await inputPw.setValue('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
				inputPw.trigger("focusout");
				expect(wrapper.vm.form.password.error).toBe(true);
			});

			it("Valid", async () => {
				const inputPw = wrapper.find('[data-input="password"]');
				await inputPw.setValue('testtest')
				inputPw.trigger("focusout");
				expect(wrapper.vm.form.password.error).toBe(false);
				expect(wrapper.vm.form.password.valid).toBe(true);
			});
		})

		describe("RepeatPassword", () => {
			it("Invalid : not equal", async () => {
				const inputPw = wrapper.find('[data-input="password"]');
				const inputRpw = wrapper.find('[data-input="repeatPassword"]');

				await inputPw.setValue('testtest')
				await inputRpw.setValue('azerty')
				inputRpw.trigger("focusout");
				expect(wrapper.vm.form.repeatPassword.error).toBe(true);
			})

			it("Invalid : equal but empty", async () => {
				const inputPw = wrapper.find('[data-input="password"]');
				const inputRpw = wrapper.find('[data-input="repeatPassword"]');

				await inputPw.setValue('')
				await inputRpw.setValue('')
				inputRpw.trigger("focusout");
				expect(wrapper.vm.form.repeatPassword.error).toBe(true);
			})

			it("Valid", async () => {
				const inputPw = wrapper.find('[data-input="password"]');
				const inputRpw = wrapper.find('[data-input="repeatPassword"]');

				await inputPw.setValue('azerty')
				await inputRpw.setValue('azerty')
				inputRpw.trigger("focusout");
				expect(wrapper.vm.form.repeatPassword.error).toBe(false);
				expect(wrapper.vm.form.repeatPassword.valid).toBe(true);
			})
		})
		
		describe("Role", () => {
			it("Invalid : not selected", async () => {
				const btnSignup = wrapper.find('[data-btn="btnSignup"]');
				expect(wrapper.vm.form.role.error).toBe(false);
				btnSignup.trigger("click");
				expect(wrapper.vm.form.role.error).toBe(true);
			})

			it("Valid : Select author", async () => {
				const btnAuthor = wrapper.find('[data-btn="btnAuthor"]');
				btnAuthor.trigger("click");
				expect(wrapper.vm.form.role.value).toBe("author");
			})

			it("Valid : Select editor", async () => {
				const btnEditor = wrapper.find('[data-btn="btnEditor"]');
				btnEditor.trigger("click");
				expect(wrapper.vm.form.role.value).toBe("editor");
			})
		})
	})

	it("Reset", async () => {
		const btnReset = wrapper.find('[data-btn="btnReset"]');
		expect(wrapper.vm.form).not.toMatchObject(initalForm);
		btnReset.trigger("click");
		expect(wrapper.vm.form).toMatchObject(initalForm);
	})

	it("Valid Signup", async () => {

		mockedServer.listen()

		wrapper.find('[data-input="lastname"]').setValue("test");
		wrapper.find('[data-input="firstname"]').setValue("test");
		wrapper.find('[data-input="email"]').setValue("test@test.fr");
		wrapper.find('[data-input="password"]').setValue("testtest");
		wrapper.find('[data-input="repeatPassword"]').setValue("testtest");

		const btnAuthor = wrapper.find('[data-btn="btnAuthor"]');
		btnAuthor.trigger("click");

		const btnSignup = wrapper.find('[data-btn="btnSignup"]');
		btnSignup.trigger("click");

		await sleep(50);

		expect(wrapper.vm.form.response).toMatchObject({lastname: "test", firstname: "test", email: "test@test.fr"});

		mockedServer.close()
	})
})
