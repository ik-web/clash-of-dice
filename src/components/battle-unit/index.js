import { computed, defineComponent, onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { rollDice } from '@/utils/roll-dice';
import { leveling } from '@/utils/leveling';
import { useMonsterStore } from '@/stores/monster';
import { useCharacterStore } from '@/stores/character';
import VButton from '@/components/button/VButton.vue';
import SpellModal from './components/spell-modal/SpellModal.vue';
import ActionModal from './components/action-modal/ActionModal.vue';
import InitiativeModal from './components/initiative-modal/InitiativeModal.vue';

export default defineComponent({
    components: {
        InitiativeModal,
        ActionModal,
        SpellModal,
        VButton,
    },

    props: {
        unit: {
            type: Object,
            required: true,
        },
        preparing: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },

    emits: ['acted'],

    setup(props, { emit }) {
        const monsterStore = useMonsterStore();
        const characterStore = useCharacterStore();
        const { selectedCharacters } = storeToRefs(characterStore);
        const { updateMonster, deleteMonster } = monsterStore;
        const { updateCharacter, toggleCharacter } = characterStore;

        const hp = ref('');
        const spellData = ref({});
        const actionData = ref({});
        const isSpellModal = ref(false);
        const isActionModal = ref(false);
        const isInitiativeModal = ref(false);

        const imgSrc = computed(() => {
            return props.unit.level
                ? props.unit.image
                : `https://www.dnd5eapi.co${props.unit.image}`;
        });

        const unitExp = computed(() => {
            return `${props.unit.exp}/${leveling[props.unit.level]}`;
        });

        const unitArmor = computed(() => {
            const armors = props.unit.armor.map(armor => armor.value);
            return Math.max(...armors);
        });

        const dexMod = computed(() => {
            return props.unit.dex && Math.floor((props.unit.dex - 10) / 2);
        });

        const updateExpirience = () => {
            const exp = Math.ceil(props.unit.xp / selectedCharacters.value.length);

            selectedCharacters.value.forEach(char => {
                const updatedExp = char.exp + exp;
                const isUpdateLavel = char.level !== 20 && updatedExp > leveling[char.level];
                const updatedLevel = isUpdateLavel ? char.level + 1 : char.level;

                updateCharacter(char.id, { exp: updatedExp, level: updatedLevel });
            });
        };

        const removeUnit = () => {
            if (props.unit.class) {
                toggleCharacter(props.unit.id);
            } else {
                updateExpirience();
                deleteMonster(props.unit.id);
            }
        };

        const setHP = type => {
            if (type === 'hit') {
                const newHp = props.unit.currentHp - +hp.value;
                const currentHp = newHp < 0 ? 0 : newHp;

                if (props.unit.class) {
                    updateCharacter(props.unit.id, { currentHp });
                } else {
                    updateMonster(props.unit.id, { currentHp });
                }
            }

            if (type === 'heal') {
                const newHp = props.unit.currentHp + +hp.value;
                const currentHp = newHp > props.unit.hp ? props.unit.hp : newHp;

                if (props.unit.class) {
                    updateCharacter(props.unit.id, { currentHp });
                } else {
                    updateMonster(props.unit.id, { currentHp });
                }
            }

            if (props.unit.currentHp <= 0) {
                removeUnit();
            }

            hp.value = '';
        };

        const openSpellModal = spell => {
            spellData.value = { ...spell, unitCR: props.unit.cr };
            isSpellModal.value = true;
        };

        const closeSpellModal = () => {
            isSpellModal.value = false;
        };

        const openActionModal = action => {
            actionData.value = action;
            isActionModal.value = true;
        };

        const closeActionModal = () => {
            isActionModal.value = false;
        };

        const openInitiativeModal = () => {
            isInitiativeModal.value = true;
        };

        const setCharacterInitiative = initiative => {
            updateCharacter(props.unit.id, { initiative });
            isInitiativeModal.value = false;
        };

        const rollMonsterInitiative = () => {
            if (!props.unit.class && !props.unit.initiative) {
                const initiative = rollDice() + (dexMod.value || 0);
                updateMonster(props.unit.id, { initiative });
            }
        };

        onMounted(() => {
            rollMonsterInitiative();
        });

        return {
            hp,
            imgSrc,
            dexMod,
            unitExp,
            unitArmor,
            spellData,
            actionData,
            isSpellModal,
            isActionModal,
            isInitiativeModal,
            setHP,
            openSpellModal,
            closeSpellModal,
            openActionModal,
            closeActionModal,
            openInitiativeModal,
            setCharacterInitiative,
        };
    },
});
