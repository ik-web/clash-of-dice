<template>
    <v-modal :open="open">
        <div class="initiative-modal">
            <h2 class="initiative-modal__title">
                {{ 'Enter the result of your initiative roll' }}
            </h2>

            <form
                class="initiative-modal__form"
                @submit.prevent="onClick"
            >
                <input
                    class="initiative-modal__form-input"
                    type="number"
                    v-model="input"
                    ref="initiativeInput"
                />
                <v-button
                    color="green"
                    upper
                    label="Ok"
                />
            </form>
        </div>
    </v-modal>
</template>

<script src="./index.js"></script>
<style src="./index.scss" scoped></style>
