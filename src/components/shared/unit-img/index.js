import { defineComponent, ref } from 'vue';

export default defineComponent({
    props: {
        src: {
            type: String,
            required: true,
        },
        alt: {
            type: String,
            default: '',
        },
        size: {
            type: String,
            default: '80px',
        },
        cover: {
            type: Boolean,
            default: false,
        },
    },

    setup() {
        const loaded = ref(false);
        return { loaded };
    },
});
