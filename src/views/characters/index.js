import { defineComponent, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useCharacterStore } from '@/stores/character';
import PageLayout from '../../components/layout/PageLayout.vue';
import MyCharacter from './components/character/MyCharacter.vue';
import CharacterForm from './components/form/CharacterForm.vue';

export default defineComponent({
	components: {
		PageLayout,
		MyCharacter,
		CharacterForm,
	},

	setup() {
		const characterStore = useCharacterStore();
		const { character } = storeToRefs(characterStore);
		const editMode = ref(false);

		return { character, editMode };
	},
});
