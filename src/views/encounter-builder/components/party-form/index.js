import { computed, defineComponent, ref, watchEffect } from 'vue';
import { classes } from '@/utils/classes';
import { leveling } from '@/utils/leveling';
import { useCharStore } from '@/store/character';
import VModal from '@/components/ui/modal/VModal.vue';
import VSelect from '@/components/ui/select/VSelect.vue';
import VButton from '@/components/ui/button/VButton.vue';

export default defineComponent({
    components: { VModal, VSelect, VButton },

    props: {
        open: {
            type: Boolean,
            default: false,
        },
    },

    emits: ['update:open'],

    setup() {
        return {};
    },
});
