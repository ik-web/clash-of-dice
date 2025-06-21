<template>
    <v-drawer
        :open="open"
        @close="$emit('update:open', false)"
    >
        <div class="monster-builder">
            <div class="monster-builder__content">
                <div class="monster-builder__content-left">
                    <h2 class="monster-builder__title">
                        {{ 'Add monsters' }}
                    </h2>

                    <label class="monster-builder__field">
                        <span>Challenge rating (CR):</span>
                        <v-select
                            v-model="monsterCR"
                            :options="challenges"
                        />
                    </label>

                    <label class="monster-builder__field">
                        <span>Search:</span>
                        <input
                            type="text"
                            spellcheck="false"
                            v-model="searchQuery"
                        />
                    </label>

                    <div class="monster-builder__monsters">
                        <div
                            class="monster-builder__monster"
                            v-for="monster in monstersList"
                            :key="monster.index"
                        >
                            <span>{{ monster.name }}</span>
                            <v-button
                                class="monster-builder__monster-btn"
                                color="green"
                                label="+"
                                bold
                                @click="addMonster(monster)"
                            />
                        </div>
                    </div>
                </div>

                <div class="monster-builder__content-right">
                    <h2 class="monster-builder__title">
                        {{ 'Selected monsters' }}
                    </h2>

                    <div class="monster-builder__selected-monsters">
                        <div
                            class="monster-builder__monster"
                            v-for="monster in selectedMonsters"
                            :key="monster.index"
                        >
                            <span>{{ monster.name }}</span>

                            <div class="monster-builder__monster-actions">
                                <v-button
                                    class="monster-builder__monster-btn"
                                    color="red"
                                    label="−"
                                    bold
                                    @click="removeMonster(monster)"
                                />
                                <input
                                    v-model="monster.count"
                                    type="number"
                                />
                                <v-button
                                    class="monster-builder__monster-btn"
                                    color="green"
                                    label="+"
                                    bold
                                    @click="monster.count++"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="monster-builder__btn-container">
                <v-button
                    color="gray"
                    label="Cancel"
                    upper
                    @click="$emit('update:open')"
                />
                <v-button
                    color="green"
                    label="Confirm"
                    upper
                    :disabled="loading"
                    @click="addMonsters"
                />
            </div>
        </div>
    </v-drawer>
</template>

<script src="./index.js"></script>
<style src="./index.scss" scoped></style>
