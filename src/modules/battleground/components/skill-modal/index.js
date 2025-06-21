import { defineComponent, ref, watchEffect } from 'vue';
import { rollDice } from '@/utils/roll-dice';
import VModal from '@/components/modal/VModal.vue';
import VButton from '@/components/button/VButton.vue';

export default defineComponent({
    components: { VModal, VButton },

    props: {
        open: {
            type: Boolean,
            default: false,
        },
        action: {
            type: Object,
            required: true,
        },
        actions: {
            type: Array,
            required: true,
        },
    },

    emits: ['close'],

    setup(props) {
        const hit = ref(null);
        const attack = ref(null);
        const isCrit = ref(false);
        const isAdvantage = ref(false);
        const isDisadvantage = ref(false);

        const computeHit = (damage, sep) => {
            const [diceInfo, extraDmg] = damage.split(sep);
            const [diceCount, diceType] = diceInfo.split('d');
            let diceDmg = 0;

            const rollCount = isCrit.value ? diceCount * 2 : +diceCount;

            for (let i = 0; i < rollCount; i++) {
                const rollResult = rollDice(+diceType);
                diceDmg += rollResult;
            }

            if (!extraDmg) return diceDmg;

            return sep === '+' ? diceDmg + +extraDmg : diceDmg - +extraDmg;
        };

        const getHitByDamageDice = damageDice => {
            if (!damageDice.includes('d')) {
                return isCrit.value ? damageDice * 2 : damageDice;
            }

            if (damageDice.includes('+')) {
                return computeHit(damageDice, '+');
            }

            if (damageDice.includes('-')) {
                return computeHit(damageDice, '-');
            }

            return computeHit(damageDice);
        };

        const getDamageDice = action => {
            return action.damage[0]?.damage_dice || action.damage[0]?.from.options[0].damage_dice;
        };

        const getMultiattackDamage = () => {
            const actions = [];

            props.action.actions.forEach(a => {
                for (let i = 0; i < +a.count; i++) {
                    actions.push(a.action_name);
                }
            });

            const multiattackDamage = actions.reduce((acc, name) => {
                const action = props.actions.find(a => a.name === name);
                const damageDice = getDamageDice(action);
                acc += getHitByDamageDice(damageDice);

                return acc;
            }, 0);

            return multiattackDamage;
        };

        const getHit = () => {
            if (+attack.value === 1) return 0;

            const multiattack = props.action.name === 'Multiattack';
            const damageDice = getDamageDice(props.action);

            if (multiattack) return getMultiattackDamage();
            if (damageDice) return getHitByDamageDice(damageDice);
        };

        const rollAttack = () => {
            isCrit.value = false;
            let diceResult = rollDice();

            if (isAdvantage.value || isDisadvantage.value) {
                const resultA = rollDice();
                const resultB = rollDice();

                if (isAdvantage.value) {
                    diceResult = resultA > resultB ? resultA : resultB;
                }

                if (isDisadvantage.value) {
                    diceResult = resultA > resultB ? resultB : resultA;
                }
            }

            if (diceResult === 20) {
                isCrit.value = true;
                attack.value = diceResult;
            } else {
                attack.value = diceResult + (props.action.attack_bonus || 0);
            }
        };

        const rollHit = () => {
            hit.value = getHit();
        };

        watchEffect(() => {
            if (!props.open) {
                hit.value = null;
                attack.value = null;
                isCrit.value = false;
            }
        });

        return {
            hit,
            attack,
            isCrit,
            isAdvantage,
            isDisadvantage,
            rollHit,
            rollAttack,
        };
    },
});
