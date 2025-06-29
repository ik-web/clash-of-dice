<template>
    <page-layout>
        <div class="combat">
            <v-unit
                v-for="unit in units"
                :key="unit.id"
                :unit="unit"
            />
        </div>
    </page-layout>
</template>

<script src="./index.js"></script>
<style src="./index.scss" scoped></style>
