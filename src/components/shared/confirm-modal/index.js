import { defineComponent } from 'vue';
import VModal from '@/components/ui/modal/VModal.vue';
import VButton from '@/components/ui/button/VButton.vue';

export default defineComponent({
    components: { VModal, VButton },

    props: {
        open: {
            type: Boolean,
            required: true,
        },
        message: {
            type: String,
            default: '',
        },
    },

    emits: ['update:open', 'confirm'],

    setup(_props, { emit }) {
        const onCancel = () => {
            emit('update:open', false);
        };

        const onConfirm = () => {
            emit('confirm');
            emit('update:open', false);
        };

        return { onCancel, onConfirm };
    },
});
