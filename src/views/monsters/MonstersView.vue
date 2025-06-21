<template>
    <page-layout :subNavigation="subPages">
        <div class="monsters">
            <div class="monsters__form">
                <h2 class="monsters__form-title">
                    {{ formTitle }}
                </h2>

                <div class="monsters__form-fields">
                    <label class="monsters__form-field">
                        <span>Mode:</span>
                        <select
                            class="monsters__form-input"
                            name="mode"
                            v-model="settings.mode"
                        >
                            <option
                                v-for="mode in settings.modes"
                                :key="mode.value"
                                :value="mode.value"
                            >
                                {{ mode.label }}
                            </option>
                        </select>
                    </label>

                    <label
                        v-if="settings.mode !== 'infinity'"
                        class="monsters__form-field"
                    >
                        <span>Challenge rating (CR):</span>
                        <select
                            class="monsters__form-input"
                            name="challenge"
                            v-model="settings.cr"
                        >
                            <option
                                v-for="cr in challenges"
                                :key="cr"
                                :value="cr"
                            >
                                {{ formatCR(cr) }}
                            </option>
                        </select>
                    </label>

                    <label
                        v-if="settings.mode === 'selected'"
                        class="monsters__form-field"
                    >
                        <span>Monster:</span>
                        <select
                            class="monsters__form-input"
                            name="challenge"
                            v-model="settings.monsterIndex"
                        >
                            <option
                                v-for="monster in monsters"
                                :key="monster.index"
                                :value="monster.index"
                            >
                                {{ monster.name }}
                            </option>
                        </select>
                    </label>

                    <label
                        v-if="settings.mode === 'infinity'"
                        class="monsters__form-field"
                    >
                        <span>Difficulty:</span>
                        <select
                            class="monsters__form-input"
                            name="challenge"
                            v-model="settings.difficulty"
                        >
                            <option
                                v-for="difficulty in settings.difficulties"
                                :key="difficulty.value"
                                :value="difficulty.value"
                            >
                                {{ difficulty.label }}
                            </option>
                        </select>
                    </label>
                </div>

                <div
                    v-if="settings.mode === 'infinity'"
                    class="monsters__form-infinity-message"
                >
                    <span>Monsters are added automatically during the battle.</span>
                    <span>
                        The challenge rating (CR) is calculated according to the level of the
                        character and the set difficulty.
                    </span>
                </div>

                <div
                    v-if="monsters && settings.mode !== 'infinity'"
                    class="monsters__form-btn-container"
                >
                    <v-button
                        color="green"
                        upper
                        :disabled="addMonsterDisabled"
                        @click="onAddMonster"
                    >
                        Add monster
                    </v-button>

                    <v-button
                        color="red"
                        upper
                        @click="onResetMonsters"
                    >
                        Reset monsters
                    </v-button>
                </div>
            </div>

            <template v-if="settings.mode !== 'infinity'">
                <ul class="monsters__list">
                    <li
                        class="monsters__list-item"
                        v-for="monster in selectedMonsters"
                        :key="monster.name"
                    >
                        <img
                            class="monsters__list-item-img"
                            alt="Monster image"
                            :src="`https://www.dnd5eapi.co${monster.image}`"
                        />

                        <div class="monsters__list-item-desc">
                            <div class="monsters__list-item-name">
                                {{ monster.name }}
                            </div>

                            <div class="monsters__list-item-stats">
                                <span>CR: {{ formatCR(monster.cr) }}</span>
                                <span>HP: {{ monster.hp }}</span>
                            </div>
                        </div>

                        <button
                            class="monsters__list-item-btn"
                            @click="onRemoveMonster(monster.id)"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 -960 960 960"
                            >
                                <path
                                    d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"
                                />
                            </svg>
                        </button>
                    </li>
                </ul>
            </template>
        </div>

        <confirm-modal
            v-model:open="isConfirmModal"
            message="Are you sure you want to reset monsters?"
            @confirm="onConfirmReset"
        />
    </page-layout>
</template>

<script src="./index.js"></script>
<style src="./index.scss" scoped></style>
