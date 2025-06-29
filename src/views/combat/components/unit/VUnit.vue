<template>
    <div
        :class="{
            unit: true,
            'unit--out': isOut,
            'unit--active': active,
        }"
        @click="$emit('select', $event)"
    >
        <div class="unit__info">
            <div class="unit__row">
                <div
                    class="unit__col unit__col--img"
                    :class="{ 'unit__col--bloodied': isBloodied }"
                >
                    <img
                        class="unit__img"
                        alt="Character image"
                        :src="unitImg"
                    />
                </div>

                <div class="unit__col unit__col--actions">
                    <slot name="actions"></slot>
                </div>
            </div>

            <div class="unit__row">
                <h2 class="unit__name">
                    {{ unit.name }}
                </h2>

                <div class="unit__type">
                    {{ unit.class || unit.type }}
                </div>
            </div>

            <div class="unit__row">
                <div class="unit__lvl">
                    <span>{{ unit.lvl ? 'Level: ' : 'CR: ' }}</span>
                    <span>{{ unit.lvl || unit.cr }}</span>
                </div>

                <div class="unit__ac">
                    <span>{{ 'AC: ' }}</span>
                    <span>{{ unit.ac }}</span>
                </div>
            </div>

            <div class="unit__row">
                <div>
                    <div
                        v-if="unit.class"
                        class="unit__initiative"
                    >
                        <span>{{ 'Exp: ' }}</span>
                        <span>{{ unitExp }}</span>
                    </div>
                </div>

                <div class="unit__hp">
                    <span>{{ 'HP: ' }}</span>
                    <span>{{ unitHP }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script src="./index.js"></script>
<style src="./index.scss" scoped></style>
