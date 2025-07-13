import VModal from '@/components/ui/modal/VModal.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    components: { VModal },

    props: {
        result: {
            type: String,
            default: '',
        },
    },

    emits: ['close'],

    setup() {
        return {};
    },
});
