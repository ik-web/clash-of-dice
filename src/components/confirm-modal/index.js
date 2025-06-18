import { defineComponent } from 'vue';
import VModal from '@/components/modal/VModal.vue';

export default defineComponent({
	components: { VModal },

	props: {
		open: {
			type: Boolean,
			required: true,
		},
		message: {
			type: String,
			required: true,
		},
	},

	emits: ['update:open', 'confirm'],

	setup(_props, { emit }) {
		const onCancel = () => {
			emit('update:open', false);
		};

		const onConfirm = () => {
			emit('confirm');
		};

		return { onCancel, onConfirm };
	},
});
