<template>
    <div class="combat-card-edit">
        <template v-if="type === 'AC'">
            <div>
                <div class="combat-card-edit__row combat-card-edit__row--simple">
                    <span>Default AC:</span>
                    <span>{{ unit.defaultAC }}</span>
                </div>

                <div class="combat-card-edit__row combat-card-edit__row--simple">
                    <span>Current AC:</span>
                    <input
                        type="number"
                        v-model="currentAC"
                    />
                </div>
            </div>

            <div class="combat-card-edit__row combat-card-edit__row--double">
                <v-button
                    color="red"
                    label="Reset"
                    bold
                    @click="resetCurrentAC"
                />
                <v-button
                    color="green"
                    title="AC modified by magic or effects"
                    label="Apply"
                    bold
                    @click="changeCurrentAC"
                />
            </div>
        </template>

        <template v-if="type === 'HP'">
            <div class="combat-card-edit__row combat-card-edit__row--simple">
                <span class="combat-card-edit__row-label">
                    {{ 'HP:' }}
                </span>
                <span class="combat-card-edit__row-value">
                    <span>{{ formatHP(unit) }}</span>
                    <span class="color-blue">
                        {{ unit.tempHP ? ` (+${unit.tempHP})` : '' }}
                    </span>
                </span>
            </div>

            <div class="combat-card-edit__row combat-card-edit__row--triple">
                <v-button
                    color="green"
                    label="Heal"
                    @click="changeCurrentHP('heal')"
                />
                <input
                    type="number"
                    v-model="inputHP"
                />
                <v-button
                    color="red"
                    label="Hit"
                    @click="changeCurrentHP('hit')"
                />
            </div>

            <div class="combat-card-edit__row combat-card-edit__row--double">
                <input
                    type="number"
                    v-model="tempHP"
                />
                <v-button
                    color="blue"
                    label="Temp"
                    @click="changeTempHP"
                />
            </div>

            <div class="combat-card-edit__row combat-card-edit__row--double">
                <input
                    type="number"
                    title="Temp HP"
                    v-model="overrideHP"
                />
                <v-button
                    color="gray"
                    title="Max HP override"
                    label="Override"
                    @click="changeOverrideHP"
                />
            </div>
        </template>

        <template v-if="type === 'initiative'">
            <div class="combat-card-edit__row combat-card-edit__row--simple">
                <span>Initiative:</span>
                <span v-if="unit.initiative">
                    {{ unit.initiative }}
                </span>
                <input
                    v-else
                    type="number"
                    v-model="initiative"
                />
            </div>

            <div class="combat-card-edit__row combat-card-edit__row">
                <v-button
                    v-if="unit.initiative"
                    color="gray"
                    title="Close"
                    label="Close"
                    bold
                    @click="$emit('update:type', '')"
                />
                <v-button
                    v-else
                    color="green"
                    title="AC modified by magic or effects"
                    label="Apply"
                    bold
                    @click="setInitiative"
                />
            </div>
        </template>
    </div>
</template>

<script src="./index.js"></script>
<style src="./index.scss" scoped></style>
