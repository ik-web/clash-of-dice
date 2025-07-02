import { computed, defineComponent, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { formatHP, formatImg } from '@/utils/formatter';
import { useEncounterStore } from '@/store/encounter';
import UnitImg from '@/components/shared/unit-img/UnitImg.vue';
import HpModal from '../hp-modal/HpModal.vue';
import initiativeModal from '../initiative-modal/InitiativeModal.vue';

const MAX_INITIATIVE = 40;

export default defineComponent({
    components: { UnitImg, initiativeModal, HpModal },

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

        const isHpModal = ref(false);
        const isIniativeModal = ref(false);

        const isActive = false;
        const isWaiting = false;

        const encounterId = computed(() => route.params.id);
        const isOut = computed(() => props.unit.currentHP <= 0);
        const isBloodied = computed(() => props.unit.currentHP <= props.unit.hp / 2);

        const openHpModal = () => {
            isHpModal.value = true;
        };

        const openInitiativeModal = () => {
            isIniativeModal.value = true;
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

        const setInitiative = value => {
            if (value < 1) return;

            const initiative = value > MAX_INITIATIVE ? MAX_INITIATIVE : value;
            const unit = { ...props.unit, initiative };

            updateEncounterUnit(encounterId.value, unit);
        };

        onMounted(() => console.log(props.unit));

        return {
            formatHP,
            formatImg,

            isHpModal,
            isIniativeModal,

            isOut,
            isActive,
            isWaiting,
            isBloodied,

            setHp,
            openHpModal,
            setInitiative,
            openInitiativeModal,
        };
    },
});
