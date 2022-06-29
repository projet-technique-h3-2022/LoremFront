import EditorPublicationRequest from '@/components/EditorPublicationRequest.vue'
import { mount } from '@vue/test-utils'
import { describe, it } from 'vitest';
// import { rest } from "msw";
// import { setupServer } from "msw/node";

async function sleep(durée){
  return new Promise((r) => setTimeout(r, durée));
}

// const mockedServerDataOK = setupServer(
//   rest.get(
//     import.meta.env.VITE_URL_API + "",
//     (req, res, ctx) => {
//       return res(
//         ctx.json({})
//       );
//     }
//   )
// );

// const mockedServer = setupServer(
//   rest.post(
//     import.meta.env.VITE_URL_API + "",
//     (req, res, ctx) => {
//       return res(
//         ctx.json({})
//       );
//     }
//   )
// );

describe("Component EditorPublicationRequest", () => {

	const wrapper = mount(EditorPublicationRequest);

	it("Render title", () => {
		const [h3] = wrapper.findAll('h3');

		expect(h3.text()).toMatch(/Publication requests/);
	});

	it.skip("Accept Publucation Request", () => {
		const btnAccept = wrapper.find('[data-btn="btnAccept"]');
		btnAccept.trigger("focusout");
		// expect(wrapper.vm.response).toMatch(/Publication requests/);
	});

	it.skip("Accept Publucation Request", () => {
		const btnRefuse = wrapper.find('[data-btn="btnRefuse"]');
		btnRefuse.trigger("focusout");
		// expect(wrapper.vm.response).toMatch(/Publication requests/);
	});

})
