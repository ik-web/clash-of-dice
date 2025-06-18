import { computed, defineComponent, ref, watchEffect } from 'vue';
import { classes } from '@/utils/classes';
import { leveling } from '@/utils/leveling';
import { useCharacterStore } from '@/stores/character';
import VButton from '@/components/button/VButton.vue';

export default defineComponent({
    components: { VButton },

    props: {
        editMode: {
            type: Boolean,
            required: true,
        },
        character: {
            type: Object,
            required: true,
        },
    },

    emits: ['update:editMode'],

    setup(props, { emit }) {
        const characterStore = useCharacterStore();
        const { getCharacterForm, createCharacter, updateCharacter } = characterStore;
        const charForm = ref({});

        const getClassImage = charClass => {
            const classImgSrc = '/clash-of-dice/img/classes';
            return `${classImgSrc}/${charClass}.jpg`;
        };

        const getExpirienseByLevel = level => {
            if (charForm.value.exp >= leveling[level]) {
                return leveling[level] - 1;
            } else if (charForm.value.exp < leveling[level - 1]) {
                return leveling[level - 1];
            } else {
                return charForm.value.exp;
            }
        };

        const onCancel = () => {
            emit('update:editMode', false);
        };

        const onSubmit = () => {
            const form = charForm.value;

            if (form.name) {
                form.initiative = null;
                form.hp = +form.hp || 0;
                form.currentHp = form.hp;
                form.image = getClassImage(form.class);
                form.exp = getExpirienseByLevel(form.level);
            }

            if (props.editMode) {
                updateCharacter(props.character.id, form);
                emit('update:editMode', false);
            } else {
                createCharacter(form);
            }
        };

        const setCharForm = () => {
            charForm.value = props.editMode ? { ...props.character } : getCharacterForm();
        };

        watchEffect(setCharForm);

        return {
            classes,
            leveling,
            charForm,
            onCancel,
            onSubmit,
        };
    },
});
