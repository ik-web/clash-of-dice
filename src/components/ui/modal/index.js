import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        open: {
            type: Boolean,
            required: true,
        },
        width: {
            type: String,
            default: '450px',
        },
    },

    emits: ['close'],

    setup(_props, { emit }) {
        const closeModal = () => {
            emit('close', false);
        };

        return { closeModal };
    },
});
