import { computed, defineComponent, onMounted, ref, watchEffect } from 'vue';
import PageLayout from '../../components/layout/PageLayout.vue';
import BattleUnit from '../../components/battle-unit/BattleUnit.vue';
import { useMonsterStore } from '@/stores/monster';
import { useCharacterStore } from '@/stores/character';
import { storeToRefs } from 'pinia';

export default defineComponent({
    components: { PageLayout, BattleUnit },

    setup() {
        const monsterStore = useMonsterStore();
        const characterStore = useCharacterStore();
        const { selectedMonsters } = storeToRefs(monsterStore);
        const { selectedCharacters } = storeToRefs(characterStore);

        const units = ref([]);
        const act = ref(0);

        const isPreparing = computed(() => units.value.some(u => !u.initiative));

        const checkDisabled = unit => {
            const unitIndex = units.value.findIndex(u => u.id === unit.id);
            return unit.initiative && act.value !== unitIndex;
        };

        const onActed = () => {
            if (isPreparing.value) return;

            let nextAct = act.value + 1;

            if (nextAct >= units.value.length) {
                nextAct = 0;
            }

            act.value = nextAct;
        };

        const setUnits = () => {
            units.value = [...selectedCharacters.value, ...selectedMonsters.value];
        };

        const sortUnitsByInitiative = () => {
            if (isPreparing.value) return;
            units.value = [...units.value].sort((a, b) => b.initiative - a.initiative);
        };

        watchEffect(setUnits);
        watchEffect(sortUnitsByInitiative);

        return {
            units,
            isPreparing,
            selectedCharacters,
            onActed,
            checkDisabled,
            selectedMonsters,
        };
    },
});
