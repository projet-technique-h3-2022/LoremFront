import MyGroups from "@/components/MyGroups.vue"
import { mount } from '@vue/test-utils'
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { rest } from "msw";
import { setupServer } from "msw/node";

async function sleep(durée){
  return new Promise((r) => setTimeout(r, durée));
}

const mockedServer = setupServer(
  rest.get(
    import.meta.env.VITE_URL_API + "/group/editor",
    (req, res, ctx) => {
      return res(
        ctx.json(
					[
						{"_id":"0","title":"Test de titre pour groupe","articles":[],"id_editor":"62baf656e00305c564dd030c","__v":0}
					]
				)
      );
    }
  ),
	rest.post(
		import.meta.env.VITE_URL_API + "/group",
		(req, res, ctx) => {
      return res(
        ctx.json({"_id":"0","title":"add test"})
      );
    }
	),
	rest.put(
		import.meta.env.VITE_URL_API + "/group/:id",
		(req, res, ctx) => {
      return res(
        ctx.json({"_id":"0","title":"update test"})
      );
    }
	),
	rest.delete(
		import.meta.env.VITE_URL_API + "/group/:id",
		(req, res, ctx) => {
      return res(
        ctx.json({"_id":"0","title":"delete test"})
      );
    }
	),

);

const mockedServerDataEmpty = setupServer(
  rest.get(
    import.meta.env.VITE_URL_API + "/group/editor",
    (req, res, ctx) => {
      return res(
        ctx.json([])
      );
    }
  )
);

describe("Component MyGroups", () => {

	let wrapper = mount(MyGroups);

	it("Render title and button", () => {
		const [h3] = wrapper.findAll('h3');
		const btnAccept = wrapper.find('[data-btn="btnSetModalAdd"]');
		expect(h3.text()).toMatch(/My groups/);
		expect(btnAccept.text()).toMatch(/Add a group/);

		wrapper.unmount()
	});

	it("On Mount - Data empty with special mockedServer", async () => {
		mockedServerDataEmpty.listen();
		wrapper = mount(MyGroups);
		await sleep(300);
		expect(wrapper.vm.groups).toStrictEqual([]);
		wrapper.unmount()
		mockedServerDataEmpty.close()
	})

	describe("With Mocked Server", () => {
		beforeAll(async () => {
			mockedServer.listen()
			wrapper = mount(MyGroups);
		})
		afterAll(() => {
			wrapper.unmount()
			mockedServer.close()
		})

		it("On Mount - Data not empty", async () => {
			await sleep(300);
			expect(wrapper.vm.groups).toStrictEqual([
				{"_id":"0","title":"Test de titre pour groupe","articles":[],"id_editor":"62baf656e00305c564dd030c","__v":0}
			]);
		})
	
		it("Validation : title incorrect", async () => {
			const inputTitle = wrapper.find('[data-input="title"]')
			await inputTitle.setValue("c");
			inputTitle.trigger("focusout")
			expect(wrapper.vm.form.title.error).toBe(true);
		})

		it("Validation : title correct", async () => {
			const inputTitle = wrapper.find('[data-input="title"]')
			await inputTitle.setValue("test");
			inputTitle.trigger("focusout")
			expect(wrapper.vm.form.title.valid).toBe(true)
		})

		it("Function setModal type='add'", async () => {
			const btnSetModalAdd = wrapper.find('[data-btn="btnSetModalAdd"]')
			btnSetModalAdd.trigger("click")
			expect(wrapper.vm.mode).toBe("add")
			expect(wrapper.vm.form.title.value).toBe("")
			
		})

		it("Function setModal type='update'", async () => {
			const btnSetModalUpdate = wrapper.findAll('[data-btn="btnSetModalUpdate"]')[0]
			btnSetModalUpdate.trigger("click")
			expect(wrapper.vm.mode).toBe("update")
			expect(wrapper.vm.form.title.value).toBe("Test de titre pour groupe")
		})

		it("Add group", async () => {
			wrapper.vm.form.title.value = "add test";
			const btnAdd = wrapper.find('[data-btn="btnAdd"]')
			btnAdd.trigger("click")
			await sleep(300)
			expect(wrapper.vm.form.response).toBe('')
		})

		it("update group", async () => {
			wrapper.vm.form.title.value = "update test";
			wrapper.vm.group = wrapper.vm.groups[0];
			const btnUpdate = wrapper.find('[data-btn="btnUpdate"]')
			btnUpdate.trigger("click")
			await sleep(300)
			expect(wrapper.vm.form.response).toBe('')
		})

		it("delete group", async () => {
			const btnDelete = wrapper.findAll('[data-btn="btnDelete"]')[0]
			btnDelete.trigger("click")
			await sleep(300)
			expect(wrapper.vm.form.response).toBe('')
		})

	})

})
