import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useEncounterStore } from '@/store/encounter';
import PageLayout from '@/components/layout/PageLayout.vue';
import VButton from '@/components/ui/button/VButton.vue';

export default defineComponent({
    components: { PageLayout, VButton },

    setup() {
        const router = useRouter();
        const encaunterStore = useEncounterStore();
        const { encounters } = storeToRefs(encaunterStore);

        const getUnitsCount = units => {
            const totalUnits = units.length;
            const aliveUnits = units.filter(u => u.currentHP).length;

            return `${aliveUnits}/${totalUnits}`;
        };

        const playCombat = id => {
            router.push({
                name: 'encounters-combat',
                params: { id },
            });
        };

        return {
            encounters,
            getUnitsCount,

            playCombat,
        };
    },
});
