<template>
    <v-modal
        :open="open"
        @close="$emit('update:open', false)"
    >
        <div class="initiative-modal">
            <h2 class="initiative-modal__name">
                {{ unitName }}
            </h2>

            <p class="initiative-modal__message">
                {{ 'Enter the result of initiative roll' }}
            </p>

            <form
                class="initiative-modal__form"
                @submit.prevent="onSubmit"
            >
                <input
                    class="initiative-modal__form-input"
                    type="number"
                    v-model="input"
                    ref="initiativeInput"
                />
                <v-button
                    color="green"
                    type="submit"
                    label="Ok"
                    upper
                />
            </form>
        </div>
    </v-modal>
</template>

<script src="./index.js"></script>
<style src="./index.scss" scoped></style>
