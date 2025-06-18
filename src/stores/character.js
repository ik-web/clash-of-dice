import { defineStore } from 'pinia';
import { ref } from 'vue';

const getCharacterForm = () => ({
    id: '',
    exp: 0,
    name: '',
    level: 1,
    hp: null,
    image: '',
    currentHp: 0,
    initiative: null,
    class: 'Barbarian',
    armor: [{ value: null }],
});

export const useCharacterStore = defineStore('character', () => {
    const characters = ref([getCharacterForm()]);
    const selectedCharacters = ref([]);

    const saveCharacters = () => {
        localStorage.setItem(
            'characters',
            JSON.stringify({
                characters: characters.value,
                selectedCharacters: selectedCharacters.value,
            }),
        );
    };

    const createCharacter = data => {
        const char = { ...data, id: crypto.randomUUID() };
        characters.value = [...characters.value, char];
        saveCharacters();
    };

    const updateCharacter = (id, data) => {
        const charIndex = characters.value.findIndex(char => char.id === id);
        const cselectedCharIndex = selectedCharacters.value.findIndex(char => char.id === id);

        if (charIndex >= 0) {
            characters.value[charIndex] = { ...characters.value[charIndex], ...data };
        }

        if (cselectedCharIndex >= 0) {
            selectedCharacters.value[cselectedCharIndex] = {
                ...selectedCharacters.value[cselectedCharIndex],
                ...data,
            };
        }

        saveCharacters();
    };

    const deleteCharacter = id => {
        characters.value = characters.value.filter(char => char.id !== id);
        selectedCharacters.value = selectedCharacters.value.filter(char => char.id !== id);
        saveCharacters();
    };

    const toggleCharacter = id => {
        const isSelected = selectedCharacters.value.find(char => char.id === id);

        if (isSelected) {
            selectedCharacters.value = selectedCharacters.value.filter(char => char.id !== id);
        } else {
            const character = characters.value.find(char => char.id === id);
            selectedCharacters.value = [character, ...selectedCharacters.value];
        }

        saveCharacters();
    };

    const setCharsFromLocalStorage = () => {
        const chars = localStorage.getItem('characters');

        if (!chars) return;

        const charsData = JSON.parse(chars);
        characters.value = charsData.characters;
        selectedCharacters.value = charsData.selectedCharacters;
    };

    return {
        characters,
        selectedCharacters,
        createCharacter,
        updateCharacter,
        deleteCharacter,
        toggleCharacter,
        getCharacterForm,
        setCharsFromLocalStorage,
    };
});
