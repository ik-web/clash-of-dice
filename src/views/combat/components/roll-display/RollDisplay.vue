<template>
    <v-modal
        className="roll-modal"
        width="400px"
        :open="open"
        @close="onClose"
    >
        <div class="roll-display">
            <span v-show="open">
                {{ result }}
            </span>
        </div>
    </v-modal>
</template>

<script src="./index.js"></script>
<style src="./index.scss"></style>
