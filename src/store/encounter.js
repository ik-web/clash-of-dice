import { defineStore } from 'pinia';
import { ref } from 'vue';

const STORAGE_KEY = 'encounters';

export const useEncounterStore = defineStore('encounter', () => {
    const encounters = ref([]);

    const saveEncounterState = () => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ encounters: encounters.value }));
    };

    const getEncounter = id => {
        return encounters.value.find(e => e.id === id) || null;
    };

    const createEncounter = data => {
        const newEncounter = {
            id: crypto.randomUUID(),
            name: data.name,
            units: data.units,
            status: { value: 'ready', label: 'Ready' },
        };

        encounters.value = [...encounters.value, newEncounter];
        saveEncounterState();
    };

    const updateEncounter = (id, data) => {};

    const deleteEncounter = id => {};

    const loadEncounterState = () => {
        const encountersInStorage = localStorage.getItem(STORAGE_KEY);

        if (!encountersInStorage) return;

        const encountersData = JSON.parse(encountersInStorage);
        encounters.value = encountersData.encounters;
    };

    const clearEncounterState = () => {
        localStorage.removeItem(STORAGE_KEY);
        encounters.value = [];
    };

    return {
        encounters,

        getEncounter,
        createEncounter,
        updateEncounter,
        deleteEncounter,

        saveEncounterState,
        loadEncounterState,
        clearEncounterState,
    };
});
