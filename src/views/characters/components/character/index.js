import { storeToRefs } from 'pinia';
import { computed, defineComponent, ref } from 'vue';
import { useCharacterStore } from '@/stores/character';
import { leveling } from '@/utils/leveling';
import ConfirmModal from '@/components/confirm-modal/ConfirmModal.vue';

export default defineComponent({
	components: { ConfirmModal },

	props: {
		editMode: {
			type: Boolean,
			required: true,
		},
	},

	emits: ['update:editMode'],

	setup(_props, { emit }) {
		const characterStore = useCharacterStore();
		const { character } = storeToRefs(characterStore);
		const { resetCharacter } = characterStore;
		const isConfirmModal = ref(false);

		const totalExpByLvl = computed(() => {
			return leveling[character.value.level];
		});

		const onCharEdit = () => {
			emit('update:editMode', true);
		};

		const onCharDelete = () => {
			isConfirmModal.value = true;
		};

		const onConfirmDelete = () => {
			resetCharacter();
			isConfirmModal.value = false;
		};

		return {
			character,
			totalExpByLvl,
			isConfirmModal,
			onCharEdit,
			onCharDelete,
			onConfirmDelete,
		};
	},
});
