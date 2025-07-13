<template>
    <v-modal
        className="roll-modal"
        width="400px"
        :open="!!result"
        @close="$emit('close')"
    >
        <div class="roll-display">
            {{ result }}
        </div>
    </v-modal>
</template>

<script src="./index.js"></script>
<style src="./index.scss"></style>
