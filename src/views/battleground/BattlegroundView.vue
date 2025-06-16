<template>
    <page-layout>
        <div class="battleground">
            <div class="creatures">
                <div
                    v-show="loading"
                    class="creatures__loading"
                >
                    Loading...
                </div>

                <template v-if="creatures.length">
                    <v-creature
                        class="creatures__creature"
                        v-for="(creature, key) in creatures"
                        :key="key"
                        :creature="creature"
                    />
                </template>
            </div>

            <div class="battle">
                <div class="battle__logs"></div>
            </div>
        </div>
    </page-layout>
</template>

<script src="./index.js"></script>
<style src="./index.scss" scoped></style>
