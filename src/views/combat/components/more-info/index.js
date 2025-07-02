import VDrawer from '@/components/ui/drawer/VDrawer.vue';
import { defineComponent } from 'vue';

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
