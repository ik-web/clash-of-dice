<template>
    <v-drawer
        :open="open"
        @close="$emit('update:open', false)"
    >
        <div class="more-info">
            <h2 class="more-info__name">
                {{ unit.name }}
            </h2>

            <div class="more-info__about"></div>
        </div>
    </v-drawer>
</template>

<script src="./index.js"></script>
<style src="./index.scss" scoped></style>
