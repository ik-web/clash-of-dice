<template>
    <router-view />
</template>

<script setup>
import { onMounted } from 'vue';
import { useScoreStore } from './modules/scoring/store';
import { useMonsterStore } from './modules/monsters/store';
import { useSettingsStore } from './modules/settings/store';
import { useCharacterStore } from './modules/characters/store';

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
