import { defineComponent } from 'vue';
import { useEncounterStore } from '@/store/encounter';
import { storeToRefs } from 'pinia';
import PageLayout from '@/components/layout/PageLayout.vue';
import VButton from '@/components/ui/button/VButton.vue';

export default defineComponent({
    components: { PageLayout, VButton },

    setup() {
        const encaunterStore = useEncounterStore();
        const { encounters } = storeToRefs(encaunterStore);

        const getUnitsCount = units => {
            const totalUnits = units.length;
            const aliveUnits = units.filter(u => u.currentHP).length;

            return `${aliveUnits}/${totalUnits}`;
        };

        return { encounters, getUnitsCount };
    },
});
