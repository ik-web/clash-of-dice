<template>
    <v-modal
        className="roll-modal"
        width="400px"
        :open="open"
        @close="onClose"
    >
        <div class="roll-display">
            <div v-show="open">
                <span>{{ result }}</span>
                <v-button
                    class="roll-display__btn"
                    color="gray"
                    title="Close"
                    label="Close"
                    upper
                    @click="onClose"
                />
            </div>
        </div>
    </v-modal>
</template>

<script src="./index.js"></script>
<style src="./index.scss"></style>
