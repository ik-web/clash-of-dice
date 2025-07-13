import { computed, defineComponent, ref, toRefs, watch } from 'vue';
import { useRollStore } from '@/store/roll';
import VModal from '@/components/ui/modal/VModal.vue';
import VButton from '@/components/ui/button/VButton.vue';

export default defineComponent({
    components: { VModal, VButton },
    emits: ['close'],

    setup() {
        const rollStore = useRollStore();
        const { dicesResult, total, bonus } = toRefs(rollStore.state);
        const { $reset } = rollStore;

        const open = ref(false);

        const result = computed(() => {
            return !!bonus.value
                ? `[ ${dicesResult.value.join(', ')} ] + ${bonus.value} = ${total.value}`
                : `[ ${dicesResult.value} ] = ${total.value}`;
        });

        const onClose = () => $reset();

        watch(total, isOpen => (open.value = !!isOpen));

        return {
            open,
            result,
            onClose,
        };
    },
});
