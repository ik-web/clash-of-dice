import { defineComponent } from 'vue';
import VModal from '@/components/modal/VModal.vue';

export default defineComponent({
	components: { VModal },

	props: {
		color: {
			type: String,
			default: 'default',
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
		upper: {
			type: Boolean,
			default: false,
		},
	},

	emits: ['click'],

	setup(_props, { emit }) {
		const onClick = () => {
			emit('click', false);
		};

		return { onClick };
	},
});
