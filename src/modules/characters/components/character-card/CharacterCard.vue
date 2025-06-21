<template>
    <div
        class="character-card"
        :class="{ 'character-card--selected': isSelected }"
    >
        <template v-if="character.name">
            <div
                class="character-card__char"
                @click="onCharClick"
            >
                <h2 class="character-card__name">
                    <span>{{ character.name }}</span>
                </h2>

                <div class="character-card__desc">
                    <div class="character-card__desc-class">
                        <img
                            class="character-card__desc-img"
                            alt="Character image"
                            :src="character.image"
                        />
                    </div>

                    <div class="character-card__desc-stats">
                        <div>
                            <div class="character-card__desc-stat">
                                <span class="multiple">Level:</span>
                                <span>{{ character.level }}</span>
                            </div>

                            <div class="character-card__desc-stat">
                                <span class="horisontal">Exp:</span>
                                <span class="vertical">Experience:</span>
                                <span>{{ `${character.exp}` }}/{{ totalExpByLvl }}</span>
                            </div>
                        </div>

                        <div>
                            <div class="character-card__desc-stat">
                                <span class="horisontal">AC:</span>
                                <span class="vertical">Armor class (AC):</span>
                                <span>{{ character.armor[0].value }}</span>
                            </div>

                            <div class="character-card__desc-stat">
                                <span class="horisontal">HP:</span>
                                <span class="vertical">Hit points (HP):</span>
                                <span>{{ character.currentHp }}/{{ character.hp }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="character-card__btn-container">
                    <v-button
                        :color="isSelected ? 'green' : 'gray'"
                        label="Edit"
                        upper
                        @click="onCharEdit"
                    />
                    <v-button
                        :color="isSelected ? 'red' : 'gray'"
                        label="Delete"
                        upper
                        @click="onCharDelete"
                    />
                </div>

                <confirm-modal
                    v-model:open="isConfirmModal"
                    :message="`Are you sure you want to delete the character ${character.name}?`"
                    @confirm="onConfirmDelete"
                />
            </div>
        </template>

        <template v-else>
            <v-button
                color="green"
                label="Add"
                bold
                upper
                @click="openCharModal"
            />
        </template>

        <character-modal
            v-model:open="isCharModal"
            v-model:editMode="editMode"
        />
    </div>
</template>

<script src="./index.js"></script>
<style src="./index.scss" scoped></style>
