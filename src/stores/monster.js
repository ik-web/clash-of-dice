import { dndApiService } from '@/services/dnd-api';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMonsterStore = defineStore('monster', () => {
	const monsters = ref(null);
	const selectedMonsters = ref([]);

	const fetchMonsters = async (cr) => {
		const response = await dndApiService.getMonsterListByRating(cr);
		monsters.value = response.results;
	};

	const selectMonster = async (index) => {
		const monster = await dndApiService.getMonsterByIndex(index);
		monster.id = crypto.randomUUID();
		selectedMonsters.value = [...selectedMonsters.value, monster];
		localStorage.setItem('monsters', JSON.stringify(selectedMonsters.value));
	};

	const resetSelectedMonsters = () => {
		localStorage.removeItem('monsters');
		selectedMonsters.value = [];
	};

	const removeSelectedMonsters = (id) => {
		selectedMonsters.value = selectedMonsters.value.filter((monster) => monster.id !== id);
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
		resetSelectedMonsters,
		removeSelectedMonsters,
		setMonstersFromLocalStorage,
	};
});
