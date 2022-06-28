import Login from '@/pages/Login.vue'
import { mount } from '@vue/test-utils'
import { describe, it } from 'vitest';
import { rest } from "msw";
import { setupServer } from "msw/node";

async function sleep(durée){
  return new Promise((r) => setTimeout(r, durée));
}

const mockedServer = setupServer(
  rest.post(
    import.meta.env.VITE_URL_API + "/user/login",
    (req, res, ctx) => {
      return res(
        ctx.json({id:"azertyuio", lastname: "test", firstname: "test", email: "test@test.fr", token: "azertyuiop"})
      );
    }
  )
);

describe("Login page", () => {

	const wrapper = mount(Login);
	const initalForm = JSON.parse(JSON.stringify(wrapper.vm.form))

	it("Render title and label", () => {
		const [h1] = wrapper.findAll('h1');
		const [labelEmail, labelPw] = wrapper.findAll('label');

		expect(h1.text()).toMatch(/Login/);
		expect(labelEmail.text()).toMatch(/Email/);
		expect(labelPw.text()).toMatch(/Password/);
	});

	it("Render button", () => {
		const [btnReset, btnLogin] = wrapper.findAll('button');
		expect(btnReset.text()).toMatch(/Reset/);
		expect(btnLogin.text()).toMatch(/Login/);
	});

	describe("Validation", () => {

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
	})

	it("Reset", async () => {
		const btnReset = wrapper.find('[data-btn="btnReset"]');
		expect(wrapper.vm.form).not.toMatchObject(initalForm);
		btnReset.trigger("click");
		expect(wrapper.vm.form).toMatchObject(initalForm);
	})

	it("Valid Login", async () => {

		mockedServer.listen()

		wrapper.find('[data-input="email"]').setValue("test@test.fr");
		wrapper.find('[data-input="password"]').setValue("testtest");

		const btnLogin = wrapper.find('[data-btn="btnLogin"]');
		btnLogin.trigger("click");

		await sleep(50);

		expect(wrapper.vm.form.response).toMatchObject({id:"azertyuio", lastname: "test", firstname: "test", email: "test@test.fr", token: "azertyuiop"});

		mockedServer.close()
	})
})
