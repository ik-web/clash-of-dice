<template>
    <v-modal
        :open="open"
        @close="$emit('update:open', false)"
    >
        <div class="hp-modal">
            <h2 class="hp-modal__name">
                {{ unitName }}
            </h2>

            <p class="hp-modal__message">
                {{ 'Cast Healing or Deal Damage' }}
            </p>

            <form
                class="hp-modal__form"
                @submit.prevent
            >
                <v-button
                    color="red"
                    label="Hit"
                    upper
                    @click="onClick('hit')"
                />
                <input
                    class="hp-modal__form-input"
                    type="number"
                    v-model="input"
                    ref="hpInput"
                />
                <v-button
                    color="green"
                    label="Heal"
                    upper
                    @click="onClick('heal')"
                />
            </form>
        </div>
    </v-modal>
</template>

<script src="./index.js"></script>
<style src="./index.scss" scoped></style>
