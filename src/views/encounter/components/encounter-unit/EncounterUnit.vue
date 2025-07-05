<template>
    <div class="unit">
        <div class="unit__img">
            <unit-img
                alt="Image"
                :src="formatImg(unit.image)"
                :cover="!unit.class"
            />
        </div>

        <div class="unit__info">
            <div
                class="unit__name"
                :class="unit.class ? 'color-green' : 'color-red'"
            >
                {{ unit.name }}
            </div>

            <div class="unit__row">
                <span>
                    <span>{{ unit.lvl ? `Level: ` : `CR: ` }}</span>
                    <span>{{ unit.lvl || formatCR(unit.CR) }}</span>
                </span>
                <span>
                    <span>{{ 'AC: ' }}</span>
                    <span>{{ unit.currentAC }}</span>
                </span>
            </div>

            <div class="unit__row">
                <span>
                    <span>{{ 'Exp: ' }}</span>
                    <span>{{ formatXP(unit.exp, unit.lvl) }}</span>
                </span>
                <span>
                    <span>{{ 'HP: ' }}</span>
                    <span>{{ formatHP(unit) }}</span>
                </span>
            </div>
        </div>

        <unit-menu class="unit__menu">
            <button
                class="unit__menu-btn color-green"
                @click="$emit('refresh', unit)"
            >
                Refresh
            </button>
            <!-- <button
                class="unit__menu-btn"
                v-if="unit.class"
                @click="$emit('edit', unit)"
            >
                Edit
            </button> -->
            <button
                class="unit__menu-btn color-red"
                @click="$emit('delete', unit.id)"
            >
                Delete
            </button>
        </unit-menu>
    </div>
</template>

<script src="./index.js"></script>
<style src="./index.scss" scoped></style>
