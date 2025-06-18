<template>
    <v-modal :open="open">
        <div class="action-modal">
            <h2 class="action-modal__title">
                {{ action.name }}
            </h2>

            <div class="action-modal__subtitle">
                {{ action.desc }}
            </div>

            <div
                v-if="action.name === 'Multiattack' || action.damage?.length"
                class="action-modal__roll"
            >
                <label class="action-modal__roll-checkbox">
                    <input
                        v-model="isAdvantage"
                        type="checkbox"
                        :disabled="isDisadvantage"
                    />
                    <span>Advantage</span>
                </label>

                <label class="action-modal__roll-checkbox">
                    <input
                        v-model="isDisadvantage"
                        type="checkbox"
                        :disabled="isAdvantage"
                    />
                    <span>Disadvantage</span>
                </label>

                <div>
                    <v-button
                        color="green"
                        label="Attack"
                        upper
                        @click="rollAttack"
                    />
                    <span
                        v-if="isCrit"
                        class="action-modal__roll-crit"
                    >
                        {{ attack }}
                    </span>
                    <span v-else>{{ attack }}</span>
                </div>

                <div>
                    <v-button
                        color="red"
                        label="Hit"
                        upper
                        :disabled="!attack"
                        @click="rollHit"
                    />
                    <span>{{ hit }}</span>
                </div>
            </div>

            <v-button
                class="action-modal__btn-close"
                color="gray"
                label="Close"
                @click="$emit('close')"
            />
        </div>
    </v-modal>
</template>

<script src="./index.js"></script>
<style src="./index.scss" scoped></style>
