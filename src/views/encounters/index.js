import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useEncounterStore } from '@/store/encounter';
import VButton from '@/components/ui/button/VButton.vue';
import PageLayout from '@/components/layout/PageLayout.vue';
import UnitMenu from '@/components/shared/unit-menu/UnitMenu.vue';

export default defineComponent({
    components: { PageLayout, UnitMenu, VButton },

    setup() {
        const router = useRouter();
        const encaunterStore = useEncounterStore();
        const { encounters } = storeToRefs(encaunterStore);
        const { updateEncounter, deleteEncounter } = encaunterStore;

        const getUnitsCount = units => {
            const totalUnits = units.length;
            const aliveUnits = units.filter(u => u.currentHP).length;

            return `${aliveUnits}/${totalUnits}`;
        };

        const refreshEncounter = encounter => {
            const { id, units } = encounter;
            const refreshedUnits = units.map(unit => ({
                ...unit,
                initiative: null,
                currentHP: unit.hp,
            }));
            const data = {
                units: refreshedUnits,
                status: { value: 'ready', label: 'Ready' },
            };

            updateEncounter(id, data);
        };

        const editEncounter = id => {
            router.push({
                name: 'encounters-encounter',
                params: { id },
            });
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
            editEncounter,
            deleteEncounter,
            refreshEncounter,
        };
    },
});
