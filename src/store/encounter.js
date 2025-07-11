import { defineStore } from 'pinia';
import { ref } from 'vue';
import { deleteUnit, updateUnit } from '@/utils/units';

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
            status: { label: 'Ready', value: 'ready' },
        };

        encounters.value = [...encounters.value, newEncounter];
        saveEncounterState();
    };

    const updateEncounter = (id, data) => {
        encounters.value = updateUnit(id, data, encounters.value);
        saveEncounterState();
    };

    const deleteEncounter = id => {
        encounters.value = deleteUnit(id, encounters.value);
        saveEncounterState();
    };

    const updateEncounterUnit = (encaunterId, unit) => {
        const encounter = getEncounter(encaunterId);
        const unitIndex = encounter.units.findIndex(u => u.id === unit.id);

        if (unitIndex < 0) return;

        encounter.units[unitIndex] = unit;
        saveEncounterState();
    };

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

        updateEncounterUnit,

        saveEncounterState,
        loadEncounterState,
        clearEncounterState,
    };
});
