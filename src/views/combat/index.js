import { defineComponent, nextTick, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useEncounterStore } from '@/store/encounter';
import PageLayout from '@/components/layout/PageLayout.vue';
import CombatCard from './components/combat-card/CombatCard.vue';
import RollDisplay from './components/roll-display/RollDisplay.vue';
import { useRollStore } from '@/store/roll';
import { storeToRefs } from 'pinia';

export default defineComponent({
    components: {
        PageLayout,
        CombatCard,
        RollDisplay,
    },

    setup() {
        const route = useRoute();
        const router = useRouter();
        const rollStore = useRollStore();
        const encounterStore = useEncounterStore();
        const { rollResult } = storeToRefs(rollStore);
        const { resetRollResult } = rollStore;
        const { getEncounter, updateEncounter } = encounterStore;

        const encounter = getEncounter(route.params.id);

        if (!encounter) router.push('/404');

        const units = ref(encounter.units);

        onMounted(() => {
            if (encounter.status.value === 'ready') {
                const newStatus = {
                    label: 'In progress',
                    value: 'process',
                };

                updateEncounter(encounter.id, { status: newStatus });
            }
        });

        return { units, rollResult, resetRollResult };
    },
});
