<template>
	<router-view />
</template>

<script setup>
import { onMounted } from 'vue';
import { useCharacterStore } from './stores/character';

const { setCharFromLocalStorage } = useCharacterStore();

onMounted(() => {
	setCharFromLocalStorage();
});
</script>
