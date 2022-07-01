import EditorPublicationRequest from '@/components/EditorPublicationRequest.vue'
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
		import.meta.env.VITE_URL_API + "/request/:id/valid",
		(req, res, ctx) => {
      return res(
        ctx.json({"_id":"0","id_article":"1","id_group":"2"})
      );
    }
	),
	rest.delete(
		import.meta.env.VITE_URL_API + "/request/:id/refuse",
		(req, res, ctx) => {
      return res(
        ctx.json({"_id":"0","id_article":"1","id_group":"2"})
      );
    }
	),
);

describe("Component EditorPublicationRequest", () => {

	let wrapper

	beforeAll(async () => {
		mockedServer.listen()
		wrapper = mount(EditorPublicationRequest);
	})
	afterAll(() => {
		wrapper.unmount()
		mockedServer.close()
	})

	it("Render title", () => {
		const [h3] = wrapper.findAll('h3');
		expect(h3.text()).toMatch(/Publication requests/);
	});

	it("On Mount - Data not empty", async () => {
		await sleep(300);
		expect(wrapper.vm.requests).toStrictEqual([
			{"_id":"0","id_article":"1","id_group":"2"},
			{"_id":"1","id_article":"2","id_group":"3"}
		]);
	})

	it("Accept Publucation Request", () => {
		const btnAccept = wrapper.findAll('[data-btn="btnAccept"]')[0];
		btnAccept.trigger("click");
		sleep(300);
		expect(wrapper.vm.response).toBe("");
	});

	it("Accept Publucation Request", () => {
		const btnRefuse = wrapper.findAll('[data-btn="btnRefuse"]')[0];
		btnRefuse.trigger("click");
		sleep(300);
		expect(wrapper.vm.response).toBe("");
	});

})
