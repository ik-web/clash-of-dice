import { computed, defineComponent, ref } from 'vue';
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

        const isOut = false;
        const isActive = false;
        const isWaiting = false;
        const isBloodied = false;

        const encounterId = computed(() => route.params.id);

        const openHpModal = () => {
            isHpModal.value = true;
        };

        const openInitiativeModal = () => {
            isIniativeModal.value = true;
        };

        const setHp = ({ type, value }) => {
            if (+value < 1) return;

            let unit;

            if (type === 'hit') {
                console.log('HIT');
            }

            if (type === 'heal') {
                console.log('HEAL');
            }

            if (!unit) return;

            updateEncounterUnit(encounterId.value, unit);
        };

        const setInitiative = value => {
            if (+value < 1) return;

            const initiative = value > MAX_INITIATIVE ? MAX_INITIATIVE : value;
            const unit = { ...props.unit, initiative };

            updateEncounterUnit(encounterId.value, unit);
        };

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
