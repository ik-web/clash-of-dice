import { defineComponent } from 'vue';
import VDrawer from '@/components/ui/drawer/VDrawer.vue';

export default defineComponent({
    components: { VDrawer },

    props: {
        open: {
            type: Boolean,
            default: false,
        },
        unit: {
            type: Object,
            required: true,
        },
    },

    setup() {
        return {};
    },
});
