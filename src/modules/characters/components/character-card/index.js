import { computed, defineComponent, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { leveling } from '@/utils/leveling';
import { useCharacterStore } from '@/modules/characters/store';
import VButton from '@/components/button/VButton.vue';
import ConfirmModal from '@/components/confirm-modal/ConfirmModal.vue';
import CharacterModal from '../character-modal/CharacterModal.vue';

export default defineComponent({
    components: { VButton, CharacterModal, ConfirmModal },

    props: {
        character: {
            type: Object,
            default: {},
        },
    },

    setup(props) {
        const characterStore = useCharacterStore();
        const { selectedCharacters } = storeToRefs(characterStore);
        const { toggleCharacter, deleteCharacter } = characterStore;

        const editMode = ref(false);
        const isCharModal = ref(false);
        const isConfirmModal = ref(false);

        const totalExpByLvl = computed(() => {
            if (!props.character.level) return;
            return leveling[props.character.level];
        });

        const isSelected = computed(() => {
            if (!props.character.id) return false;
            return selectedCharacters.value.some(char => char.id === props.character.id);
        });

        const openCharModal = () => {
            isCharModal.value = true;
        };

        const onCharClick = () => {
            toggleCharacter(props.character.id);
        };

        const onCharEdit = () => {};

        const onCharDelete = () => {
            isConfirmModal.value = true;
        };

        const onConfirmDelete = () => {
            deleteCharacter(props.character.id);
            isConfirmModal.value = false;
        };

        return {
            editMode,
            isSelected,
            isCharModal,
            totalExpByLvl,
            isConfirmModal,
            onCharEdit,
            onCharClick,
            onCharDelete,
            openCharModal,
            onConfirmDelete,
        };
    },
});
