import { defineComponent, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { deleteUnit, updateUnit } from '@/utils/units';
import { useEncounterStore } from '@/store/encounter';
import VButton from '@/components/ui/button/VButton.vue';
import PageLayout from '@/components/layout/PageLayout.vue';
import CharBuilder from './components/char-builder/CharBuilder.vue';
import EncounterUnit from './components/encounter-unit/EncounterUnit.vue';
import MonsterBuilder from './components/monster-builder/MonsterBuilder.vue';

export default defineComponent({
    components: {
        VButton,
        PageLayout,
        CharBuilder,
        EncounterUnit,
        MonsterBuilder,
    },

    setup() {
        const route = useRoute();
        const router = useRouter();
        const encounterStore = useEncounterStore();
        const { createEncounter, updateEncounter, getEncounter } = encounterStore;

        const isCharBuilder = ref(false);
        const isPartyBuilder = ref(false);
        const isMonsterBuilder = ref(false);

        const units = ref([]);
        const charForEdit = ref({});
        const encounterName = ref('');

        const openCharBuilder = () => {
            isCharBuilder.value = true;
        };

        const openMonsterBuilder = () => {
            isMonsterBuilder.value = true;
        };

        const openPartyBuilder = () => {
            isPartyBuilder.value = true;
        };

        const onAddChars = chars => {
            units.value.unshift(...chars);
        };

        const onAddMonsters = monsters => {
            units.value.push(...monsters);
        };

        const onEditUnit = unit => {};

        const onRefreshUnit = unit => {
            const dataForUpdate = {
                tempHP: null,
                overrideHP: null,
                initiative: null,
                currentAC: unit.defaultAC,
                currentHP: unit.defaultHP,
            };

            units.value = updateUnit(unit.id, dataForUpdate, units.value);
        };

        const onDeleteUnit = id => {
            units.value = deleteUnit(id, units.value);
        };

        const saveEncounter = () => {
            const encounterId = route.params.id;
            const encounterData = {
                name: encounterName.value,
                units: units.value,
            };

            if (encounterId === 'create') {
                createEncounter(encounterData);
            } else {
                updateEncounter(encounterId, encounterData);
            }

            router.push('/encounters');
        };

        const handleEncounterIdByRoute = id => {
            if (id !== 'create') {
                const encounter = getEncounter(id);

                if (encounter) {
                    units.value = encounter.units;
                    encounterName.value = encounter.name;
                } else {
                    units.value = [];
                    encounterName.value = '';

                    router.push({
                        name: 'encounters-encounter',
                        params: { id: 'create' },
                    });
                }
            } else {
                units.value = [];
                encounterName.value = '';
            }
        };

        watch(() => route.params.id, handleEncounterIdByRoute, { immediate: true });

        return {
            units,
            isCharBuilder,
            charForEdit,
            isMonsterBuilder,

            encounterName,
            saveEncounter,

            openCharBuilder,
            openPartyBuilder,
            openMonsterBuilder,

            onAddChars,
            onAddMonsters,

            onEditUnit,
            onDeleteUnit,
            onRefreshUnit,
        };
    },
});
