import { computed, defineComponent, ref, watchEffect } from 'vue';
import { classes } from '@/utils/classes';
import { leveling } from '@/utils/leveling';
import { useCharacterStore } from '@/modules/characters/store';
import VModal from '@/components/modal/VModal.vue';
import VSelect from '@/components/select/VSelect.vue';
import VButton from '@/components/button/VButton.vue';

export default defineComponent({
    components: { VModal, VSelect, VButton },

    props: {
        open: {
            type: Boolean,
            default: false,
        },
        editMode: {
            type: Boolean,
            default: false,
        },
    },

    emits: ['update:open', 'update:editMode'],

    setup(props, { emit }) {
        const characterStore = useCharacterStore();
        const { getCharacterForm, createCharacter, updateCharacter } = characterStore;
        const charForm = ref(getCharacterForm());

        const isSaveDisabled = computed(() => {
            return !props.editMode && !charForm.value.name;
        });

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
            emit('update:open', false);
        };

        const onSave = () => {
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

            charForm.value = getCharacterForm();
            emit('update:open', false);
        };

        const setCharForm = () => {
            charForm.value = props.editMode ? { ...props.character } : getCharacterForm();
        };

        watchEffect(setCharForm);

        return {
            classes,
            leveling,
            charForm,
            isSaveDisabled,
            onSave,
            onCancel,
        };
    },
});
