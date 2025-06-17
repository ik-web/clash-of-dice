import { defineStore } from 'pinia';
import { ref } from 'vue';

const defaultCharacter = {
	img: '',
	name: '',
	class: 'Barbarian',
	level: 1,
	experience: 0,
	hp: null,
	ac: null,
};

export const useCharacterStore = defineStore('character', () => {
	const character = ref({ ...defaultCharacter });

	const setCharacter = (charData) => {
		character.value = charData;
		localStorage.setItem('character', JSON.stringify(character.value));
	};

	const resetCharacter = () => {
		character.value = { ...defaultCharacter };
		localStorage.removeItem('character');
	};

	const setCharFromLocalStorage = () => {
		const char = localStorage.getItem('character');

		if (char) {
			character.value = JSON.parse(char);
		}
	};

	return {
		character,
		setCharacter,
		resetCharacter,
		setCharFromLocalStorage,
	};
});
