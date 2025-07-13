import { defineComponent, onMounted, onUnmounted } from 'vue';

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
        className: {
            type: String,
            default: '',
        },
    },

    emits: ['close'],

    setup(_props, { emit }) {
        const closeModal = () => {
            emit('close', false);
        };

        const onPressEsc = e => {
            if (e.key === 'Escape') {
                closeModal();
            }
        };

        onMounted(() => {
            window.addEventListener('keydown', onPressEsc);
        });

        onUnmounted(() => {
            window.removeEventListener('keydown', onPressEsc);
        });

        return { onPressEsc, closeModal };
    },
});
