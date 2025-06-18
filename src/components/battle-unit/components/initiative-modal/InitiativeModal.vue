<template>
    <v-modal :open="open">
        <div class="initiative-modal">
            <h2>Enter the result of your initiative roll</h2>

            <form @submit.prevent="onClick">
                <input
                    type="number"
                    v-model="input"
                />
                <v-button
                    color="gray"
                    label="Ok"
                />
            </form>
        </div>
    </v-modal>
</template>

<script src="./index.js"></script>
<style src="./index.scss" scoped></style>
