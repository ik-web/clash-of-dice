<template>
    <router-view />
</template>

<script setup>
import { onMounted } from 'vue';
import { useScoreStore } from './stores/score';
import { useMonsterStore } from './stores/monster';
import { useSettingsStore } from './stores/settings';
import { useCharacterStore } from './stores/character';

const { setScoreFromLocalStorage } = useScoreStore();
const { setCharsFromLocalStorage } = useCharacterStore();
const { setMonstersFromLocalStorage } = useMonsterStore();
const { setSettingsFromLocalStorage } = useSettingsStore();

onMounted(() => {
    setCharsFromLocalStorage();
    setScoreFromLocalStorage();
    setMonstersFromLocalStorage();
    setSettingsFromLocalStorage();
});
</script>
