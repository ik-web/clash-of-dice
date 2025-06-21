<template>
    <v-modal :open="open">
        <div class="confirm-modal">
            <p class="confirm-modal__message">
                <slot>
                    {{ message }}
                </slot>
            </p>

            <div class="confirm-modal__btn-container">
                <v-button
                    class="confirm-modal__btn"
                    color="gray"
                    label="Cancel"
                    upper
                    @click="onCancel"
                />
                <v-button
                    class="confirm-modal__btn"
                    color="red"
                    label="Confirm"
                    upper
                    @click="onConfirm"
                />
            </div>
        </div>
    </v-modal>
</template>

<script src="./index.js"></script>
<style src="./index.scss" scoped></style>
