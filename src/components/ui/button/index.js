import { defineComponent } from 'vue';
import VModal from '@/components/ui/modal/VModal.vue';

export default defineComponent({
	components: { VModal },

	props: {
		color: {
			type: String,
			default: 'default',
		},
		type: {
			type: String,
			default: 'button',
		},
		title: {
			type: String,
			default: '',
		},
		label: {
			type: String,
			default: '',
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		bold: {
			type: Boolean,
			default: false,
		},
		upper: {
			type: Boolean,
			default: false,
		},
	},

	emits: ['click'],

	setup() {
		return {};
	},
});
