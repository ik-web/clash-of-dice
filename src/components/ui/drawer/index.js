import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        open: {
            type: Boolean,
            required: true,
        },
    },

    emits: ['close'],

    setup(_props, { emit }) {
        const onMaskClick = e => {
            if (e.target === e.currentTarget) {
                emit('close', false);
            }
        };

        const closeDrawer = () => {
            emit('close', false);
        };

        return { onMaskClick, closeDrawer };
    },
});
