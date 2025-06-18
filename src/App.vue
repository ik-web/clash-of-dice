<template>
    <router-view />
</template>

<script setup>
import { onMounted } from 'vue';
import { useCharacterStore } from './stores/character';
import { useMonsterStore } from './stores/monster';
import { useSettingsStore } from './stores/settings';

const { setCharsFromLocalStorage } = useCharacterStore();
const { setMonstersFromLocalStorage } = useMonsterStore();
const { setSettingsFromLocalStorage } = useSettingsStore();

onMounted(() => {
    setCharsFromLocalStorage();
    setMonstersFromLocalStorage();
    setSettingsFromLocalStorage();
});
</script>
