<template>
    <v-drawer
        :open="open"
        @close="$emit('update:open', false)"
    >
        <div class="defence-info">
            <h2 class="defence-info__name">
                {{ unit.name }}
            </h2>

            <p class="defence-info__heading">
                {{ '(Defence)' }}
            </p>

            <div class="defence-info__about">
                <template v-if="unit.class">
                    <div class="defence-info__row">
                        <span class="defence-info__row-title">
                            {{ 'Armor class (AC): ' }}
                        </span>
                        <span>{{ unit.ac }}</span>
                    </div>
                </template>

                <template v-else>
                    <div class="defence-info__row">
                        <span class="defence-info__row-title">
                            {{ 'Armor class (AC): ' }}
                        </span>
                        <span>{{ unit.ac }}</span>
                    </div>
                </template>
            </div>
        </div>
    </v-drawer>
</template>

<script src="./index.js"></script>
<style src="./index.scss" scoped></style>
