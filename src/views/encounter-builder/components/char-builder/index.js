import { computed, defineComponent, ref, watchEffect } from 'vue';
import { classes } from '@/utils/classes';
import { leveling } from '@/utils/leveling';
import { createUnit, deleteUnit } from '@/utils/units';
import VDrawer from '@/components/ui/drawer/VDrawer.vue';
import VSelect from '@/components/ui/select/VSelect.vue';
import VButton from '@/components/ui/button/VButton.vue';

const getCharForm = () => ({
    id: '',
    xp: 0,
    lvl: 1,
    name: '',
    ac: null,
    hp: null,
    image: '',
    currentHP: 0,
    initiative: null,
    class: classes[0],
});

const charClasses = classes.map(charClass => ({
    label: charClass,
    value: charClass,
}));

export default defineComponent({
    components: { VDrawer, VSelect, VButton },

    props: {
        open: {
            type: Boolean,
            default: false,
        },
    },

    emits: ['add', 'update:open'],

    setup(props, { emit }) {
        const formData = ref(getCharForm());
        const characters = ref([]);

        const isAddDisabled = computed(() => !formData.value.name);

        const charLevels = computed(() => {
            return Object.keys(leveling).map(lvl => ({
                label: lvl,
                value: +lvl,
            }));
        });

        const getClassImage = charClass => {
            const classImgSrc = '/clash-of-dice/img/classes';
            return `${classImgSrc}/${charClass}.png`;
        };

        const getExpByLevel = lvl => {
            if (formData.value.xp >= leveling[lvl]) {
                return leveling[lvl] - 1;
            } else if (formData.value.xp < leveling[lvl - 1]) {
                return leveling[lvl - 1];
            } else {
                return formData.value.xp;
            }
        };

        const prepareChar = () => {
            if (isAddDisabled.value) return;

            const form = formData.value;
            const minHP = 6;
            const minAC = 10;
            const computedHP = +form.hp <= 0 ? minHP : +form.hp;
            const computedAC = +form.ac <= 0 ? minAC : +form.ac;
            const computedXP = +form.xp < 0 ? 0 : getExpByLevel(form.lvl);

            form.hp = computedHP;
            form.ac = computedAC;
            form.xp = computedXP;
            form.initiative = null;
            form.currentHP = computedHP;
            form.image = getClassImage(form.class);

            const char = createUnit(form);
            characters.value.push(char);
            formData.value = getCharForm();
        };

        const removeChar = id => {
            characters.value = deleteUnit(id, characters.value);
        };

        const addCharacters = () => {
            emit('add', characters.value);
            emit('update:open', false);
            characters.value = [];
        };

        const setFormData = () => {
            if (props.open) formData.value = getCharForm();
        };

        watchEffect(setFormData);

        return {
            formData,
            charLevels,
            characters,
            charClasses,
            isAddDisabled,

            removeChar,
            prepareChar,
            addCharacters,
        };
    },
});
