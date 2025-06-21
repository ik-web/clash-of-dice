import { defineComponent, ref } from 'vue';
import { useEncounterStore } from '@/store/encounter';
import VButton from '@/components/ui/button/VButton.vue';
import PageLayout from '@/components/layout/PageLayout.vue';
import ConfirmModal from '@/components/shared/confirm-modal/ConfirmModal.vue';

export default defineComponent({
    components: { PageLayout, VButton, ConfirmModal },

    setup() {
        const encounterStore = useEncounterStore();
        const { clearEncounterState } = encounterStore;

        const isConfirmModal = ref(false);

        const onClearBrowserData = () => {
            isConfirmModal.value = true;
        };

        return {
            isConfirmModal,
            onClearBrowserData,
            clearEncounterState,
        };
    },
});
