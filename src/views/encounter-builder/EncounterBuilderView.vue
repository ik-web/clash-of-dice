<template>
    <page-layout>
        <div class="encounter-builder">
            <header class="encounter-builder__header">
                <div class="encounter-builder__header-col">
                    <v-button
                        class="encounter-builder__header-btn"
                        color="green"
                        title="Create character"
                        label="Characters"
                        @click="openCharBuilder"
                    />
                    <v-button
                        class="encounter-builder__header-btn"
                        color="red"
                        title="Add monster"
                        label="Monsters"
                        @click="openMonsterBuilder"
                    />
                    <v-button
                        class="encounter-builder__header-btn"
                        color="gray"
                        title="Add a party"
                        label="Parties"
                        @click="openPartyBuilder"
                    />
                </div>

                <div class="encounter-builder__header-col">
                    <input
                        class="encounter-builder__header-input"
                        type="text"
                        v-model="encounterName"
                        placeholder="Encounter name"
                    />
                    <v-button
                        class="encounter-builder__header-btn"
                        color="green"
                        label="Save"
                        :disabled="!encounterName"
                        @click="saveEncounter"
                    />
                </div>
            </header>

            <div class="encounter-builder__units">
                <encounter-unit
                    v-for="unit in units"
                    :key="unit.id"
                    :unit="unit"
                    @edit="onEditUnit"
                    @delete="onDeleteUnit"
                    @refresh="onRefreshUnit"
                />
            </div>
        </div>

        <char-builder
            v-model:open="isCharBuilder"
            :char="charForEdit"
            @add="onAddChars"
        />

        <monster-builder
            v-model:open="isMonsterBuilder"
            @add="onAddMonsters"
        />
    </page-layout>
</template>

<script src="./index.js"></script>
<style src="./index.scss" scoped></style>
