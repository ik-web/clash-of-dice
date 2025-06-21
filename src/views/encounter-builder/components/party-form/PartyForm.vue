<template>
    <v-modal :open="open">
        <div class="form-container">
            <form
                class="party-form"
                @submit.prevent
            ></form>
        </div>
    </v-modal>
</template>

<script src="./index.js"></script>
<style src="./index.scss" scoped></style>
