import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useRollStore = defineStore('roll', () => {
    const rollResult = ref('');

    const rollDices = (dices = '1d20', bonus = 0) => {
        const dicesToArr = dices.split('d');
        const dicesCount = dicesToArr[0];
        const dice = dicesToArr[1];
        const dicesResult = [];
        let result = 0;

        for (let i = 1; i <= dicesCount; i++) {
            const diceResult = Math.ceil(Math.random() * dice);
            result += diceResult;

            dicesResult.push(diceResult);
        }

        result += +bonus;

        const rollResultToStr = !!bonus
            ? `[ ${dicesResult.join(', ')} ] + ${bonus} = ${result}`
            : `${dicesResult} = ${result}`;

        rollResult.value = rollResultToStr;
    };

    const resetRollResult = () => {
        rollResult.value = '';
    };

    return {
        rollResult,

        rollDices,
        resetRollResult,
    };
});
