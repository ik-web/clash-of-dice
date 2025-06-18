import { computed, defineComponent, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { leveling } from '@/utils/leveling';
import { useCharacterStore } from '@/stores/character';
import VButton from '@/components/button/VButton.vue';
import ConfirmModal from '@/components/confirm-modal/ConfirmModal.vue';

export default defineComponent({
    components: { VButton, ConfirmModal },

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
        const { selectedCharacters } = storeToRefs(characterStore);
        const { toggleCharacter, deleteCharacter } = characterStore;
        const isConfirmModal = ref(false);

        const totalExpByLvl = computed(() => {
            return leveling[props.character.level];
        });

        const isSelected = computed(() => {
            return selectedCharacters.value.some(char => char.id === props.character.id);
        });

        const onCharEdit = () => {
            emit('update:editMode', true);
        };

        const onCharClick = () => {
            toggleCharacter(props.character.id);
        };

        const onCharDelete = () => {
            isConfirmModal.value = true;
        };

        const onConfirmDelete = () => {
            deleteCharacter(props.character.id);
            isConfirmModal.value = false;
        };

        return {
            isSelected,
            totalExpByLvl,
            isConfirmModal,
            onCharEdit,
            onCharClick,
            onCharDelete,
            onConfirmDelete,
        };
    },
});
