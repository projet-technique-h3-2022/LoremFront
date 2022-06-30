import AddEditArticle from "@/components/AddEditArticle.vue"
import { mount } from '@vue/test-utils'
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { rest } from "msw";
import { setupServer } from "msw/node";

const mockedServer = setupServer(
    rest.get(
        import.meta.env.VITE_URL_API + "/article/:id",
        (req, res, ctx) => {
            return res(
                ctx.json({ "title": "Test de titre pour article", "content": "test get" })
            );
        }
    ),
    rest.post(
        import.meta.env.VITE_URL_API + "/article",
        (req, res, ctx) => {
            return res(
                ctx.json({ "title": "Test de titre pour article", "content": "test post" })
            );
        }
    ),
    rest.put(
        import.meta.env.VITE_URL_API + "/group/:id",
        (req, res, ctx) => {
            return res(
                ctx.json({ "title": "Test de titre pour article", "content": "test put" })
            );
        }
    ),

);

describe("component AddEditArticle", () => {
    let wrapper = mount(AddEditArticle)

    it("should render title", () => {
        const [h1] = wrapper.findAll('h1')
        expect(h1.text()).toMatch(/Create an article/)
        wrapper.unmount()
    })

    describe("test api request with mocked server", () => {
        beforeAll(async () => {
			mockedServer.listen()
			wrapper = mount(AddEditArticle);
		})
		afterAll(() => {
			wrapper.unmount()
			mockedServer.close()
		})

        it("should not have enough character for title", async () => {
			const inputTitle = wrapper.find('#title')
			await inputTitle.setValue("A");
			const inputImage = wrapper.find('#imageLink')
			await inputImage.setValue("AAAAA");
			const inputContent = wrapper.find('#content')
			await inputContent.setValue("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
			const validateBtn = wrapper.find('button.btn')
            validateBtn.trigger("click")
			wrapper.unmount()
			expect(wrapper.vm.errorMsg).toStrictEqual(["The title must be at least 3 characters long"]);
		})

        it("should not have enough character for image link", async () => {
            wrapper = mount(AddEditArticle);
			const inputTitle = wrapper.find('#title')
			await inputTitle.setValue("AAAAA");
			const inputImage = wrapper.find('#imageLink')
			await inputImage.setValue("A");
			const inputContent = wrapper.find('#content')
			await inputContent.setValue("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
			const validateBtn = wrapper.find('button.btn')
            validateBtn.trigger("click")
			expect(wrapper.vm.errorMsg).toStrictEqual(["The image link must be at least 2 characters long"]);
			wrapper.unmount()
		})

        it("should not have enough character for content", async () => {
            wrapper = mount(AddEditArticle);
			const inputTitle = wrapper.find('#title')
			await inputTitle.setValue("AAAAA");
			const inputImage = wrapper.find('#imageLink')
			await inputImage.setValue("AAAAA");
			const inputContent = wrapper.find('#content')
			await inputContent.setValue("A");
			const validateBtn = wrapper.find('button.btn')
            validateBtn.trigger("click")
			expect(wrapper.vm.errorMsg).toStrictEqual(["The content must be at least 50 characters long"]);
            wrapper.unmount()
		})

        it("should add article", async () => {
            wrapper = mount(AddEditArticle);
			const inputTitle = wrapper.find('#title')
			await inputTitle.setValue("AAAAA");
			const inputImage = wrapper.find('#imageLink')
			await inputImage.setValue("AAAAA");
			const inputContent = wrapper.find('#content')
			await inputContent.setValue("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
			const validateBtn = wrapper.find('button.btn')
            validateBtn.trigger("click")
			expect(wrapper.vm.errorMsg).toStrictEqual([]);
            wrapper.unmount()
		})

        it("should edit article", async () => {
            wrapper = mount(AddEditArticle);
			const inputTitle = wrapper.find('#title')
			await inputTitle.setValue("AAAAA");
			const inputImage = wrapper.find('#imageLink')
			await inputImage.setValue("AAAAA");
			const inputContent = wrapper.find('#content')
			await inputContent.setValue("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
			const validateBtn = wrapper.find('button.btn')
            validateBtn.trigger("click")
			expect(wrapper.vm.errorMsg).toStrictEqual([]);
            wrapper.unmount()
		})
    })
})