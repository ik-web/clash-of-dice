import { dndApiService } from '@/services/dnd-api';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMonsterStore = defineStore('monster', () => {
    const monsters = ref(null);
    const selectedMonsters = ref([]);

    const fetchMonsters = async cr => {
        const response = await dndApiService.getMonsterListByRating(cr);
        monsters.value = response.results;
    };

    const saveMonsters = () => {
        localStorage.setItem('monsters', JSON.stringify(selectedMonsters.value));
    };

    const selectMonster = async index => {
        const response = await dndApiService.getMonsterByIndex(index);
        const monster = {
            id: crypto.randomUUID(),
            xp: response.xp,
            initiative: null,
            name: response.name,
            image: response.image,
            dex: response.dexterity,
            hp: response.hit_points,
            armor: response.armor_class,
            cr: response.challenge_rating,
            currentHp: response.hit_points,
            actions: response.actions,
            spells: response.special_abilities[0]?.spellcasting?.spells || [],
        };

        selectedMonsters.value = [...selectedMonsters.value, monster];
        saveMonsters();
    };

    const updateMonster = (monsterId, data = {}) => {
        const monster = selectedMonsters.value.find(m => m.id === monsterId);

        if (monster) {
            for (const key in data) {
                monster[key] = data[key];
            }
        }

        saveMonsters();
    };

    const deleteMonster = monsterId => {
        selectedMonsters.value = selectedMonsters.value.filter(m => m.id !== monsterId);
        saveMonsters();
    };

    const resetSelectedMonsters = () => {
        localStorage.removeItem('monsters');
        selectedMonsters.value = [];
    };

    const removeSelectedMonsters = id => {
        selectedMonsters.value = selectedMonsters.value.filter(monster => monster.id !== id);
        localStorage.setItem('monsters', JSON.stringify(selectedMonsters.value));
    };

    const setMonstersFromLocalStorage = () => {
        const monsters = localStorage.getItem('monsters');

        if (!monsters) return;

        selectedMonsters.value = JSON.parse(monsters);
    };

    return {
        monsters,
        selectedMonsters,
        fetchMonsters,
        selectMonster,
        updateMonster,
        deleteMonster,
        resetSelectedMonsters,
        removeSelectedMonsters,
        setMonstersFromLocalStorage,
    };
});
