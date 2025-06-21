<template>
    <div
        class="character-card"
        :class="{ 'character-card--selected': isSelected }"
    >
        <div @click="onCharClick">
            <div class="character-card__class">
                <img
                    class="character-card__img"
                    alt="Character image"
                    :src="character.image"
                />
            </div>

            <div class="character-card__stats">
                <h2 class="character-card__stat character-card__stat--name">
                    <span>{{ character.name }}</span>
                </h2>

                <div class="character-card__stat">
                    <span>Level:</span>
                    <span>{{ character.level }}</span>
                </div>

                <div class="character-card__stat">
                    <span>Experience:</span>
                    <span>{{ `${character.exp}` }}/{{ totalExpByLvl }}</span>
                </div>

                <div class="character-card__stat">
                    <span>Hit points (HP):</span>
                    <span>{{ character.currentHp }}/{{ character.hp }}</span>
                </div>

                <div class="character-card__stat">
                    <span>Armor class (AC):</span>
                    <span>{{ character.armor[0].value }}</span>
                </div>
            </div>
        </div>

        <div class="character-card__btn-container">
            <v-button
                color="green"
                label="Edit"
                upper
                @click="onCharEdit"
            />
            <v-button
                color="red"
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

<script src="./index.js"></script>
<style src="./index.scss" scoped></style>
