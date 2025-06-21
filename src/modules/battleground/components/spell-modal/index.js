import { defineComponent, ref, watchEffect } from 'vue';
import { dndApiService } from '@/services/dnd-api';
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
        data: {
            type: Object,
            required: true,
        },
    },

    emits: ['close'],

    setup(props) {
        const loading = ref(false);
        const spell = ref({});
        const hit = ref(null);
        const attack = ref(null);
        const isCrit = ref(false);
        const isAdvantage = ref(false);
        const isDisadvantage = ref(false);

        const computeHit = diceInfo => {
            const totalDice = diceInfo.split(' + ');
            let diceDmg = 0;

            totalDice.forEach(dice => {
                if (dice.includes('d')) {
                    const [diceCount, diceType] = dice.split('d');
                    const rollCount = isCrit.value ? diceCount * 2 : +diceCount;

                    for (let i = 0; i < rollCount; i++) {
                        diceDmg += rollDice(+diceType);
                    }
                } else {
                    diceDmg += +dice;
                }
            });

            return diceDmg;
        };

        const getHit = () => {
            if (+attack.value === 1) return 0;

            const damage = spell.value.damage;
            const damageData = damage.damage_at_character_level || damage.damage_at_slot_level;

            const damageKey = Object.keys(damageData).reduce((acc, key) => {
                if (props.data.unitCR > +key) acc = +key;
                return acc;
            }, 0);

            const diceInfo = damageData[damageKey];

            if (diceInfo) {
                if (!diceInfo.includes('d')) {
                    return isCrit.value ? diceInfo * 2 : diceInfo;
                }

                return computeHit(diceInfo);
            }
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
            }

            attack.value = diceResult;
        };

        const rollHit = () => {
            hit.value = getHit();
        };

        const fetchSpell = async () => {
            loading.value = true;
            const urlParts = props.data.url.split('/');
            const spellIndex = urlParts[urlParts.length - 1];
            spell.value = await dndApiService.getSpellByIndex(spellIndex);

            loading.value = false;
        };

        watchEffect(() => {
            if (props.open) fetchSpell();
        });

        watchEffect(() => {
            if (!props.open) {
                hit.value = null;
                attack.value = null;
                isCrit.value = false;
            }
        });

        return {
            spell,
            loading,
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
