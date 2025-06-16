const BASE_URL = 'https://www.dnd5eapi.co/api';

async function fetchFromApi(endpoint) {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`);

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Failed to fetch ${endpoint}:`, error.message);
        throw error;
    }
}

export const dndApiService = {
    getAllClasses() {
        return fetchFromApi('/classes');
    },

    getClassByIndex(index) {
        return fetchFromApi(`/classes/${index}`);
    },

    getAllSpells() {
        return fetchFromApi('/spells');
    },

    getSpellByIndex(index) {
        return fetchFromApi(`/spells/${index}`);
    },

    getMonsterList() {
        return fetchFromApi('/monsters');
    },

    getMonsterListByRating(rating = 0) {
        return fetchFromApi(`/monsters?challenge_rating=${rating}`);
    },

    getMonsterByIndex(index) {
        return fetchFromApi(`/monsters/${index}`);
    },

    getRaceList() {
        return fetchFromApi('/races');
    },

    getRaceByIndex(index) {
        return fetchFromApi(`/races/${index}`);
    },
};
