import { defineStore } from 'pinia';
import { ref } from 'vue';

const defaultSettings = {
    cr: 0,
    monsterIndex: '',
    mode: 'selected',
    difficulty: 'easy',
    modes: [
        { label: 'Selected monsters', value: 'selected' },
        { label: 'Random monsters', value: 'random' },
        { label: 'Infinity battle', value: 'infinity' },
    ],
    difficulties: [
        { label: 'Easy', value: 'easy' },
        { label: 'Normal', value: 'normal' },
        { label: 'Hard', value: 'hard' },
    ],
};

export const useSettingsStore = defineStore('settings', () => {
    const settings = ref({ ...defaultSettings });

    const saveSettings = () => {
        localStorage.setItem('settings', JSON.stringify(settings.value));
    };

    const resetSettings = () => {
        localStorage.removeItem('settings');
        settings.value = { ...defaultSettings };
    };

    const setSettingsFromLocalStorage = () => {
        const sets = localStorage.getItem('settings');

        if (!sets) return;

        settings.value = JSON.parse(sets);
    };

    return {
        settings,
        saveSettings,
        resetSettings,
        setSettingsFromLocalStorage,
    };
});
