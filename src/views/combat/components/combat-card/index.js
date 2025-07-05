import { computed, defineComponent, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { formatHP, formatImg } from '@/utils/formatter';
import { useEncounterStore } from '@/store/encounter';
import EditMenu from '../edit-menu/EditMenu.vue';
import MoreDrawer from '../more-info/MoreInfo.vue';
import UnitImg from '@/components/shared/unit-img/UnitImg.vue';
import initiativeModal from '../initiative-modal/InitiativeModal.vue';

const MAX_INITIATIVE = 40;

export default defineComponent({
    components: {
        UnitImg,
        EditMenu,
        MoreDrawer,
        initiativeModal,
    },

    props: {
        unit: {
            type: Object,
            default: {},
        },
        active: {
            type: Boolean,
            default: false,
        },
    },

    setup(props) {
        const route = useRoute();
        const encounterStore = useEncounterStore();
        const { updateEncounterUnit } = encounterStore;

        const editType = ref('');

        const isHpModal = ref(false);
        const isIniativeModal = ref(false);
        const isMoreDrawer = ref(false);

        const isWaiting = false;

        const encounterId = computed(() => route.params.id);
        const isOut = computed(() => props.unit.currentHP <= 0);
        const isActive = computed(() => props.active || props.unit.initiative);
        const isBloodied = computed(() => props.unit.currentHP <= props.unit.defaultHP / 2);

        const checkACAbove = unit => {
            return unit.currentAC && unit.currentAC > unit.defaultAC;
        };

        const checkACBelow = unit => {
            return unit.currentAC && unit.currentAC < unit.defaultAC;
        };

        const editAC = () => {
            editType.value = editType.value === 'AC' ? '' : 'AC';
        };

        const editHP = () => {
            editType.value = editType.value === 'HP' ? '' : 'HP';
        };

        const setInitiative = () => {
            editType.value = editType.value === 'initiative' ? '' : 'initiative';
        };

        // =================================================================

        const openHpModal = () => {
            isHpModal.value = true;
        };

        const openInitiativeModal = () => {
            isIniativeModal.value = true;
        };

        const openMoreDrawer = () => {
            isMoreDrawer.value = true;
        };

        const setHp = ({ type, value }) => {
            if (value < 1) return;

            let currentHP = props.unit.currentHP;

            if (type === 'hit') {
                const hpResult = currentHP - value;
                currentHP = hpResult < 0 ? 0 : hpResult;
            }

            if (type === 'heal') {
                const hpResult = currentHP + value;
                currentHP = hpResult > props.unit.hp ? props.unit.hp : hpResult;
            }

            const unit = { ...props.unit, currentHP };
            updateEncounterUnit(encounterId.value, unit);
        };

        const setInitiative1 = value => {
            if (value < 1) return;

            const initiative = value > MAX_INITIATIVE ? MAX_INITIATIVE : value;
            const unit = { ...props.unit, initiative };

            updateEncounterUnit(encounterId.value, unit);
        };

        return {
            formatHP,
            formatImg,

            editType,
            editAC,
            editHP,
            setInitiative,

            isHpModal,
            isMoreDrawer,
            isIniativeModal,
            isOut,
            isActive,
            isWaiting,
            isBloodied,

            setHp,
            openHpModal,
            checkACAbove,
            checkACBelow,
            openMoreDrawer,
            openInitiativeModal,
        };
    },
});
