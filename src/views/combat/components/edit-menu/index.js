import { computed, defineComponent, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { formatHP } from '@/utils/formatter';
import { useEncounterStore } from '@/store/encounter';
import VButton from '@/components/ui/button/VButton.vue';

export default defineComponent({
    components: { VButton },

    props: {
        type: {
            type: String,
            required: true,
        },
        unit: {
            type: Object,
            required: true,
        },
    },

    emits: ['update:type'],

    setup(props, { emit }) {
        const route = useRoute();
        const encounterStore = useEncounterStore();
        const { updateEncounterUnit } = encounterStore;

        const currentAC = ref('');

        const inputHP = ref('');
        const tempHP = ref(null);
        const currentHP = ref(null);
        const overrideHP = ref(null);

        const initiative = ref(null);

        const encounterId = computed(() => route.params.id);

        // Unit AC =============================================
        const updateUnitAC = () => {
            updateEncounterUnit(encounterId.value, {
                ...props.unit,
                currentAC: currentAC.value,
            });
            emit('update:type', '');
        };

        const resetCurrentAC = () => {
            currentAC.value = props.unit.defaultAC;
            updateUnitAC();
        };

        const changeCurrentAC = () => {
            if (!encounterId.value) return;
            if (currentAC.value > 99) currentAC.value = 99;
            if (currentAC.value < 0) currentAC.value = 0;

            updateUnitAC();
        };

        // Unit HP =============================================
        const updateUnitHP = () => {
            updateEncounterUnit(encounterId.value, {
                ...props.unit,
                tempHP: tempHP.value,
                currentHP: currentHP.value,
                overrideHP: overrideHP.value,
            });
        };

        const changeTempHP = () => {
            tempHP.value = tempHP.value <= 0 ? null : tempHP.value;
            updateUnitHP();
        };

        const changeOverrideHP = () => {
            overrideHP.value = overrideHP.value < 0 ? 0 : overrideHP.value;
            const currentMaxHP =
                overrideHP.value === null ? props.unit.defaultHP : overrideHP.value;

            // if (!props.unit.overrideHP && !overrideHP.value) return;

            // if (overrideHP.value) {
            //     const diff = overrideHP.value - currentMaxHP;
            //     currentHP.value += diff;
            // } else {
            //     const diff = props.unit.defaultHP - props.unit.overrideHP;
            //     currentHP.value += diff;
            //     overrideHP.value = null;
            // }

            console.log(currentMaxHP);

            updateUnitHP();

            console.log(currentMaxHP);
        };

        const changeCurrentHP = type => {
            if (!encounterId.value) return;
            if (inputHP.value < 0) inputHP.value = 0;

            if (type === 'hit') {
                const hpResult = currentHP.value - inputHP.value;
                currentHP.value = hpResult < 0 ? 0 : hpResult;
            }

            if (type === 'heal') {
                const hpResult = currentHP.value + inputHP.value;
                const maxHP = overrideHP.value || props.unit.defaultHP;
                currentHP.value = hpResult > maxHP ? maxHP : hpResult;
            }

            updateUnitHP();
            inputHP.value = '';
        };

        // Unit initiative =====================================
        const setInitiative = () => {
            if (!initiative.value || props.unit.initiative) return;
            if (initiative.value > 99) initiative.value = 99;
            if (initiative.value < 0) initiative.value = null;

            updateEncounterUnit(encounterId.value, {
                ...props.unit,
                initiative: initiative.value,
            });

            emit('update:type', '');
        };

        const setPropsStats = type => {
            if (type === 'AC') {
                currentAC.value = props.unit.currentAC;
            }

            if (type === 'HP') {
                tempHP.value = props.unit.tempHP;
                currentHP.value = props.unit.currentHP;
                overrideHP.value = props.unit.overrideHP;
            }

            if (type === 'initiative') {
                initiative.value = props.unit.initiative;
            }
        };

        watch(() => props.type, setPropsStats);

        return {
            formatHP,

            currentAC,

            tempHP,
            inputHP,
            currentHP,
            overrideHP,

            initiative,

            resetCurrentAC,
            changeCurrentAC,

            changeTempHP,
            changeCurrentHP,
            changeOverrideHP,

            setInitiative,
        };
    },
});
