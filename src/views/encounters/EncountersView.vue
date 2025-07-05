<template>
    <page-layout>
        <div class="encounters">
            <div
                class="encounters__item encounter"
                v-for="encounter in encounters"
                :key="encounter.id"
            >
                <h3 class="encounter__name color-black">
                    {{ encounter.name }}
                </h3>

                <div class="encounter__participants">
                    <span>{{ 'Participants: ' }}</span>
                    <span>{{ getUnitsCount(encounter.units) }}</span>
                </div>

                <div class="encounter__action">
                    <div
                        class="encounter__action-status"
                        :class="`encounter__action-status--${encounter.status.value}`"
                    >
                        {{ encounter.status.label }}
                    </div>

                    <v-button
                        class="encounter__action-play"
                        color="green"
                        label="Play"
                        title="Play"
                        :disabled="encounter.status.value === 'completed'"
                        @click="playCombat(encounter.id)"
                    />
                </div>

                <unit-menu class="encounter__menu">
                    <button
                        class="encounter__menu-btn"
                        @click="refreshEncounter(encounter)"
                    >
                        Refresh
                    </button>
                    <button
                        class="encounter__menu-btn"
                        @click="editEncounter(encounter.id)"
                    >
                        Edit
                    </button>
                    <button
                        class="encounter__menu-btn"
                        @click="deleteEncounter(encounter.id)"
                    >
                        Delete
                    </button>
                </unit-menu>
            </div>
        </div>
    </page-layout>
</template>

<script src="./index.js"></script>
<style src="./index.scss" scoped></style>
