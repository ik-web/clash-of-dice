import { defineComponent } from 'vue';

export default defineComponent({
	props: {
		open: {
			type: Boolean,
			required: true,
		},
	},

	setup() {
		return {};
	},
});
