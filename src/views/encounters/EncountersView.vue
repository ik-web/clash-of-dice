<template>
    <page-layout>
        <div class="encounters">
            <div class="encounters__list">
                <div
                    class="encounters__item encounter"
                    v-for="encounter in encounters"
                    :key="encounter.id"
                >
                    <h3 class="encounter__name">
                        {{ encounter.name }}
                    </h3>

                    <div class="encounter__info">
                        <div class="encounter__participants">
                            <span>{{ 'Participants: ' }}</span>
                            <span>{{ getUnitsCount(encounter.units) }}</span>
                        </div>

                        <div
                            class="encounter__status"
                            :class="`encounter__status--${encounter.status.value}`"
                        >
                            {{ encounter.status.label }}
                        </div>

                        <v-button
                            class="encounter__play"
                            color="green"
                            label="Play"
                            title="Play"
                            :disabled="encounter.status.value === 'completed'"
                        />
                    </div>

                    <!-- <div class="encounters__item-actions">
                        <v-button
                            color="gray"
                            label="Edit"
                            upper
                        />
                        <v-button
                            color="green"
                            label="Refresh"
                            upper
                        />
                    </div> -->
                </div>
            </div>
        </div>
    </page-layout>
</template>

<script src="./index.js"></script>
<style src="./index.scss" scoped></style>
