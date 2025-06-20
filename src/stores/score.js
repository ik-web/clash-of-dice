import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useScoreStore = defineStore('score', () => {
    const score = ref([]);

    const saveScore = () => {
        localStorage.setItem('score', JSON.stringify(score.value));
    };

    const setScore = (char, monster) => {
        const charData = score.value.find(item => item.id === char.id);

        if (charData) {
            const monsterData = charData.score.find(m => monster.name === m.name);
            if (monsterData) {
                monsterData.count += 1;
            } else {
                const newMonster = {
                    count: 1,
                    hp: monster.hp,
                    cr: monster.cr,
                    name: monster.name,
                };

                charData.score = [newMonster, ...charData.score];
            }
        } else {
            const newCharScore = {
                id: char.id,
                name: char.name,
                class: char.class,
                score: [
                    {
                        count: 1,
                        hp: monster.hp,
                        cr: monster.cr,
                        name: monster.name,
                    },
                ],
            };

            score.value = [newCharScore, ...score.value];
        }

        saveScore();
    };

    const setScoreFromLocalStorage = () => {
        const scoreData = localStorage.getItem('score');

        if (!scoreData) return;

        score.value = JSON.parse(scoreData);
    };

    return {
        score,
        setScore,
        setScoreFromLocalStorage,
    };
});
