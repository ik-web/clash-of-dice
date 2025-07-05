import { computed, defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useEncounterStore } from '@/store/encounter';
import VDrawer from '@/components/ui/drawer/VDrawer.vue';
import VButton from '@/components/ui/button/VButton.vue';

export default defineComponent({
    components: { VDrawer, VButton },

    props: {
        open: {
            type: Boolean,
            default: false,
        },
        unit: {
            type: Object,
            required: true,
        },
    },

    emits: ['update:open'],

    setup(props, { emit }) {
        const route = useRoute();
        const encounterStore = useEncounterStore();
        const { updateEncounterUnit } = encounterStore;

        const defaultAC = props.unit.spellAC || props.unit.ac;
        const spellAC = ref(defaultAC);

        const acList = computed(() => {
            const list = props.unit.data?.armor_class;
            const isList = list && list.length > 1;

            return isList
                ? list.slice(1).map(ac => ({ name: ac.spell.name, value: ac.value }))
                : [];
        });

        const setSpellArmor = value => {
            spellAC.value = value;
        };

        const resetSpellArmor = () => {
            spellAC.value = props.unit.ac;
        };

        const confirmChanges = () => {
            const encaunterId = route.params.id;

            if (!encaunterId) return;

            let newSpellAC = spellAC;

            if (newSpellAC > 99) newSpellAC = 99;
            if (newSpellAC < 0) newSpellAC = 0;

            updateEncounterUnit(encaunterId, { ...props.unit, spellAC: newSpellAC });
            emit('update:open');
        };

        console.log(props.unit);

        return {
            spellAC,
            acList,
            setSpellArmor,
            confirmChanges,
            resetSpellArmor,
        };
    },
});
