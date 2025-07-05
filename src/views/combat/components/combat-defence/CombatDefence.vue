<template>
    <v-drawer
        :open="open"
        @close="$emit('update:open', false)"
    >
        <div class="combat-defence">
            <div class="combat-defence__body">
                <h2 class="combat-defence__name">
                    {{ unit.name }}
                </h2>

                <p class="combat-defence__heading">
                    {{ '(Defence)' }}
                </p>

                <div class="combat-defence__about">
                    <div class="combat-defence__row">
                        <h3 class="combat-defence__row-title">
                            {{ 'Armor class (AC):' }}
                        </h3>
                        <div class="combat-defence__ac">
                            {{ unit.spellAC || unit.ac }}
                        </div>
                    </div>

                    <div class="combat-defence__row">
                        <h3 class="combat-defence__row-title">
                            {{ 'Current armor class:' }}
                        </h3>
                        <input
                            class="combat-defence__input"
                            type="number"
                            v-model="spellAC"
                        />
                    </div>

                    <template v-if="acList.length">
                        <div
                            class="combat-defence__row"
                            v-for="item in acList"
                            :key="item.name"
                        >
                            <h3 class="combat-defence__row-title">
                                {{ item.name }} [ {{ item.value }} ]:
                            </h3>
                            <v-button
                                class="combat-defence__input"
                                color="blue"
                                label="Cast"
                                @click="setSpellArmor(item.value)"
                            />
                        </div>
                    </template>

                    <div class="combat-defence__divider"></div>

                    <div class="combat-defence__row">
                        <h3 class="combat-defence__row-title">
                            {{ 'Reset spell effect:' }}
                        </h3>
                        <v-button
                            class="combat-defence__input"
                            color="gray"
                            label="Reset"
                            @click="resetSpellArmor"
                        />
                    </div>

                    <template v-if="unit.class">
                        <div class="combat-defence__divider"></div>

                        <div class="combat-defence__row">
                            <h3 class="combat-defence__row-title">
                                {{ 'Saving throws:' }}
                            </h3>
                            <div
                                v-for="item in unit.data.saving_throws"
                                :key="item.index"
                            >
                                {{ item.name }}
                            </div>
                        </div>
                    </template>
                </div>
            </div>

            <div class="combat-defence__footer">
                <v-button
                    color="gray"
                    label="Close"
                    bold
                    upper
                    @click="$emit('update:open')"
                />
                <v-button
                    color="green"
                    title="AC modified by magic or effects"
                    label="Confirm"
                    bold
                    upper
                    @click="confirmChanges"
                />
            </div>
        </div>
    </v-drawer>
</template>

<script src="./index.js"></script>
<style src="./index.scss" scoped></style>
