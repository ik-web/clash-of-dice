<template>
    <div class="character">
        <character-card
            v-if="character.name && !editMode"
            v-model:editMode="editMode"
            :character="character"
        />

        <character-form
            v-else
            v-model:editMode="editMode"
            :character="character"
        />
    </div>
</template>

<script src="./index.js"></script>
<style src="./index.scss" scoped></style>
