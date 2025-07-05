<template>
    <div
        class="unit-img"
        :class="{ 'unit-img--cover': cover }"
    >
        <div
            v-if="!loaded"
            class="unit-img__loader"
        ></div>

        <img
            v-show="loaded"
            :src="src"
            :alt="alt"
            @load="loaded = true"
        />
    </div>
</template>

<script src="./index.js"></script>
<style src="./index.scss" scoped></style>
