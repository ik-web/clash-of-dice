<template>
    <page-layout>
        <div class="combat">
            <combat-card
                v-for="unit in units"
                :key="unit.id"
                :unit="unit"
                :active="false"
            />
        </div>
    </page-layout>
</template>

<script src="./index.js"></script>
<style src="./index.scss" scoped></style>
