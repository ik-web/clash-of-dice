import { computed, defineComponent, ref, watchEffect } from 'vue';
import { storeToRefs } from 'pinia';
import { average } from '@/utils/average';
import { useMonsterStore } from '@/stores/monster';
import { useSettingsStore } from '@/stores/settings';
import { useCharacterStore } from '@/stores/character';
import challenges from '@/utils/challenges';
import PageLayout from '../../components/layout/PageLayout.vue';
import BattleUnit from '../../components/battle-unit/BattleUnit.vue';

export default defineComponent({
    components: { PageLayout, BattleUnit },

    setup() {
        const monsterStore = useMonsterStore();
        const settingsStore = useSettingsStore();
        const characterStore = useCharacterStore();
        const { settings } = storeToRefs(settingsStore);
        const { selectedMonsters } = storeToRefs(monsterStore);
        const { selectedCharacters } = storeToRefs(characterStore);
        const { fetchMonsters, selectRandomMonster } = monsterStore;

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

        const setInfinityBattleMonsters = async () => {
            const { difficulty } = settings.value;
            const selectedCharsLvls = selectedCharacters.value.map(char => char.level);
            const averageLevel = Math.round(average(selectedCharsLvls));
            const monsterCR = challenges[averageLevel];

            console.log('averageLevel', averageLevel);

            await fetchMonsters(monsterCR);

            for (let i = 0; i < difficulty; i++) {
                selectRandomMonster();
            }
        };

        const playInfinityBattle = () => {
            if (settings.value.mode !== 'infinity') return;

            if (!selectedMonsters.value.length) {
                setTimeout(() => {
                    setInfinityBattleMonsters();
                }, 2000);
            }
        };

        watchEffect(setUnits);
        watchEffect(playInfinityBattle);
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
