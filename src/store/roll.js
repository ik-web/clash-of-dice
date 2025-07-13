import { reactive } from 'vue';
import { cloneDeep } from 'lodash';
import { defineStore } from 'pinia';

const defaultState = {
    dicesResult: [],
    bonus: 0,
    total: 0,
};

export const useRollStore = defineStore('roll', () => {
    const state = reactive(cloneDeep(defaultState));

    const rollDices = (dices = '1d20', bonus = 0) => {
        const dicesToArr = dices.split('d');
        const dicesCount = dicesToArr[0];
        const dice = dicesToArr[1];
        const dicesResult = [];
        let total = 0;

        for (let i = 1; i <= dicesCount; i++) {
            const diceResult = Math.ceil(Math.random() * dice);
            total += diceResult;

            dicesResult.push(diceResult);
        }

        total += +bonus;
        state.total = total;
        state.bonus = bonus;
        state.dicesResult = dicesResult;
    };

    const $reset = () => {
        Object.assign(state, cloneDeep(defaultState));
    };

    return {
        state,
        rollDices,
        $reset,
    };
});
