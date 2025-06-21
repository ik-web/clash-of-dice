import { defineStore } from 'pinia';
import { ref } from 'vue';

const subPages = [
    {
        path: '/settings/characters',
        label: 'Characters',
    },
    {
        path: '/settings/monsters',
        label: 'Monsters',
    },
];

const defaultSettings = {
    cr: 0,
    monsterIndex: '',
    mode: 'selected',
    difficulty: 1,
    modes: [
        { label: 'Selected monsters', value: 'selected' },
        { label: 'Random monsters', value: 'random' },
        { label: 'Infinity battle', value: 'infinity' },
    ],
    difficulties: [
        { label: 'Easy', value: 1 },
        { label: 'Normal', value: 2 },
        { label: 'Hard', value: 3 },
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
        subPages,
        saveSettings,
        resetSettings,
        setSettingsFromLocalStorage,
    };
});
