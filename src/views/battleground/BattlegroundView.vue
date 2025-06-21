<template>
    <page-layout>
        <div class="battleground">
            <div
                v-if="!units.length"
                class="battleground__alert"
            >
                <h2 class="battleground__alert-title">
                    {{ 'You have to choose at least one character or monster!' }}
                </h2>

                <router-link
                    class="battleground__alert-link"
                    to="/characters"
                >
                    Characters
                </router-link>

                <router-link
                    class="battleground__alert-link"
                    to="/monsters"
                >
                    Monsters
                </router-link>
            </div>

            <template v-else>
                <div class="battleground__units">
                    <battle-unit
                        :class="[
                            'battleground__unit',
                            { 'battleground__unit--disabled': checkDisabled(unit) },
                        ]"
                        v-for="(unit, key) in units"
                        :key="key"
                        :unit="unit"
                        :preparing="isPreparing"
                        :disabled="checkDisabled(unit)"
                        @acted="onActed"
                    />
                </div>

                <div class="battleground__logs"></div>
            </template>
        </div>
    </page-layout>
</template>

<script src="./index.js"></script>
<style src="./index.scss" scoped></style>
