import MyRequest from '@/components/MyRequest.vue'
import { mount } from '@vue/test-utils'
import { describe, it } from 'vitest';
import { rest } from "msw";
import { setupServer } from "msw/node";

async function sleep(durée){
  return new Promise((r) => setTimeout(r, durée));
}

const mockedServer = setupServer(
  rest.get(
    import.meta.env.VITE_URL_API + "/request",
    (req, res, ctx) => {
      return res(
        ctx.json(
					[
						{"_id":"0","id_article":"1","id_group":"2"},
						{"_id":"1","id_article":"2","id_group":"3"}
					]
				)
      );
    }
  ),
	rest.delete(
		import.meta.env.VITE_URL_API + "/request/:id/cancel",
		(req, res, ctx) => {
      return res(
        ctx.json({"_id":"0","id_article":"1","id_group":"2"})
      );
    }
	),
);

describe("Component MyRequest", () => {

	let wrapper

	beforeAll(async () => {
		mockedServer.listen()
		wrapper = mount(MyRequest);
	})
	afterAll(() => {
		wrapper.unmount()
		mockedServer.close()
	})

	it("Render title", () => {
		const [h3] = wrapper.findAll('h1');
		expect(h3.text()).toMatch(/My publication requests/);
	});

	it("On Mount - Data not empty", async () => {
		await sleep(300);
		expect(wrapper.vm.requests).toStrictEqual([
			{"_id":"0","id_article":"1","id_group":"2"},
			{"_id":"1","id_article":"2","id_group":"3"}
		]);
	})

	it("Cancel Publication Request", () => {
		const btnCancel = wrapper.findAll('[data-btn="btnCancel"]')[0];
		btnCancel.trigger("click");
		sleep(300);
		expect(wrapper.vm.response).toBe("");
	});

})
