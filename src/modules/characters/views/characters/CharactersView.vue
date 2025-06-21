<template>
    <page-layout>
        <div class="characters">
            <div class="characters__container">
                <template v-if="characters.length < 6">
                    <character-card />
                </template>

                <character-card
                    v-for="character in characters"
                    :key="character.id"
                    :character="character"
                />
            </div>
        </div>
    </page-layout>
</template>

<script src="./index.js"></script>
<style src="./index.scss" scoped></style>
