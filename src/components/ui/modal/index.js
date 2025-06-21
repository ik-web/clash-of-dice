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

    setup() {
        return {};
    },
});
