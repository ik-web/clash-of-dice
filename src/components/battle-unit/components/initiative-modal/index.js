import { defineComponent, ref } from 'vue';
import VModal from '@/components/modal/VModal.vue';
import VButton from '@/components/button/VButton.vue';

export default defineComponent({
    components: { VModal, VButton },

    props: {
        open: {
            type: Boolean,
            default: false,
        },
    },

    emits: ['click'],

    setup(_props, { emit }) {
        const input = ref(null);

        const onClick = () => {
            emit('click', input.value);
            input.value = null;
        };

        return { input, onClick };
    },
});
