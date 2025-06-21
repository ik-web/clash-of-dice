<template>
    <page-layout>
        <div class="encounter">
            <div class="encounter__container">
                <v-unit
                    class="encounter__unit"
                    v-for="(unit, key) in units"
                    :key="key"
                    :unit="unit"
                >
                    <template #actions>
                        <div class="encounter__unit-actions">
                            <div class="encounter__unit-hp">
                                <v-button
                                    class="encounter__unit-hp-btn"
                                    color="green"
                                    label="Heal"
                                />
                                <input
                                    class="encounter__unit-hp-input"
                                    type="number"
                                    v-model="unitHP"
                                />
                                <v-button
                                    class="encounter__unit-hp-btn"
                                    color="red"
                                    label="Hit"
                                />
                            </div>

                            <div class="encounter__unit-activity">
                                <v-button
                                    v-if="unit.actions?.length"
                                    class="encounter__unit-activity-btn"
                                    color="green"
                                    bold
                                >
                                    Skills
                                </v-button>
                                <v-button
                                    v-if="unit.spells?.length"
                                    class="encounter__unit-activity-btn"
                                    color="green"
                                    bold
                                >
                                    Spells
                                </v-button>
                                <v-button
                                    class="encounter__unit-activity-btn"
                                    color="red"
                                    bold
                                    @click="onActed(unit.id)"
                                >
                                    Skip
                                </v-button>
                            </div>

                            <div class="encounter__unit-initiative">
                                <span v-show="!isInitiativeForm">
                                    {{ 'Initiative:' }}
                                </span>
                                <v-button
                                    class="encounter__unit-initiative-btn"
                                    v-show="!isInitiativeForm"
                                    @click="openInitiativeForm(unit)"
                                >
                                    <span v-if="!unit.initiative">➕</span>
                                    <span v-else>{{ unit.initiative }}</span>
                                </v-button>

                                <form
                                    class="encounter__unit-initiative-form"
                                    v-show="isInitiativeForm"
                                    @submit.prevent="() => (isInitiativeForm = false)"
                                >
                                    <input
                                        ref="initiativeInput"
                                        name="initiative"
                                        type="number"
                                        v-model="isInitiativeForm"
                                    />
                                    <v-button
                                        color="green"
                                        type="submit"
                                        label="Ok"
                                    />
                                </form>
                            </div>
                        </div>
                    </template>
                </v-unit>
            </div>
        </div>
    </page-layout>
</template>

<script src="./index.js"></script>
<style src="./index.scss" scoped></style>
