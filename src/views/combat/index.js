import { computed, defineComponent, ref, watchEffect } from 'vue';
import { storeToRefs } from 'pinia';
import { average } from '@/utils/average';
import { useCharStore } from '@/store/character';
import { useMonsterStore } from '@/store/monster';
import { useSettingsStore } from '@/store/settings';
import challenges from '@/utils/challenges';
import VUnit from '@/components/shared/unit/VUnit.vue';
import VButton from '@/components/ui/button/VButton.vue';
import PageLayout from '@/components/layout/PageLayout.vue';
import InitiativeModal from '@/components/shared/initiative-modal/InitiativeModal.vue';

export default defineComponent({
    components: { PageLayout, VButton, VUnit, VButton, InitiativeModal },

    setup() {
        const monstersStore = useMonsterStore();
        const settingsStore = useSettingsStore();
        const charactersStore = useCharStore();
        const { settings } = storeToRefs(settingsStore);
        const { activeMonsters } = storeToRefs(monstersStore);
        const { activeCharacters } = storeToRefs(charactersStore);
        const { updateMonster } = monstersStore;
        const { updateCharacter } = charactersStore;

        const act = ref(0);
        const unitHP = ref('');
        const isSpellModal = ref(false);
        const isActionModal = ref(false);
        const isInitiativeForm = ref(false);

        const rawUnits = ref([...activeCharacters.value, ...activeMonsters.value]);

        const units = computed(() => {
            console.log(rawUnits.value);

            const isBattleReady = rawUnits.value.every(u => u.initiative);

            return isBattleReady.value ? rawUnits.value.sort((a, b) => b - a) : rawUnits.value;
        });

        const setHP = () => {};

        const onActed = () => {
            let nextAct = act.value + 1;

            if (nextAct >= units.value.length) {
                nextAct = 0;
            }

            act.value = nextAct;
        };

        const getInitiative = unit => {
            return unit.initiative > 99 ? 99 : unit.initiative;
        };

        const openInitiativeForm = unit => {
            isInitiativeForm.value = true;
        };

        const setInitiative = (unit, initiative) => {
            if (!initiative) return;
            console.log(unit);
            if (unit.class) {
                updateCharacter(unit.id, { initiative });
            } else {
                updateMonster(unit.id, { initiative });
            }
        };

        const openActionModal = () => {
            isActionModal.value = true;
        };

        const openSpellModal = () => {
            isSpellModal.value = true;
        };

        // const sortUnitsByInitiative = () => {
        // 	units.value = [...units.value].sort((a, b) => b.initiative - a.initiative);
        // };

        const setInfinityBattleMonsters = async () => {
            const { difficulty } = settings.value;
            const selectedCharsLvls = activeCharacters.value.map(char => char.level);
            const averageLevel = Math.round(average(selectedCharsLvls));
            const monsterCR = challenges[averageLevel];

            await fetchMonsters(monsterCR);

            for (let i = 0; i < difficulty; i++) {
                selectRandomMonster();
            }
        };

        const playInfinityBattle = () => {
            if (settings.value.mode !== 'infinity') return;

            if (!selectedMonsters.value.length) {
                setTimeout(() => {
                    // setInfinityBattleMonsters();
                }, 2000);
            }
        };

        // watchEffect(playInfinityBattle);

        return {
            units,
            unitHP,
            onActed,
            isSpellModal,
            isActionModal,
            isInitiativeForm,
            setHP,
            getInitiative,
            openSpellModal,
            openActionModal,
            openInitiativeForm,
        };
    },
});
