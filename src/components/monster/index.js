import { computed, defineComponent, ref } from 'vue';
import { rollDice } from '@/utils/roll-dice';

export default defineComponent({
    props: {
        creature: {
            type: Object,
            required: true,
        },
    },

    setup(props) {
        const initiative = ref(null);

        const dexMod = computed(() => Math.floor((props.creature.dexterity - 10) / 2));

        const setInitiative = () => {
            const diceResult = rollDice();
            initiative.value = diceResult + dexMod.value;
        };

        return { initiative, dexMod, setInitiative };
    },
});
