<template>
    <page-layout>
        <div class="characters">
            <v-character
                v-for="character in characters"
                :key="character.id"
                :character="character"
            />
        </div>
    </page-layout>
</template>

<script src="./index.js"></script>
<style src="./index.scss" scoped></style>
