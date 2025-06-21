<template>
    <router-view />
</template>

<script setup>
import { onMounted } from 'vue';
import { useEncounterStore } from './store/encounter';

const { loadEncounterState } = useEncounterStore();

onMounted(() => {
    loadEncounterState();
});
</script>
