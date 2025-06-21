<template>
    <div class="battle-unit">
        <div class="battle-unit__about">
            <div
                class="battle-unit__about-img"
                title="Finish the turn"
                @click="$emit('acted')"
            >
                <img
                    alt="Unit image"
                    :src="imgSrc"
                />
            </div>

            <div class="battle-unit__about-description">
                <div class="battle-unit__about-description-top">
                    <h2 class="battle-unit__about-description-name">
                        {{ unit.name }}
                    </h2>

                    <div class="battle-unit__about-description-rank">
                        <template v-if="unit.class">
                            <div class="battle-unit__about-description-level">
                                <span>Level: {{ unit.level }}</span>
                                <span>Exp: {{ unitExp }}</span>
                            </div>
                        </template>
                        <template v-else>
                            <span>CR: {{ formatCR(unit.cr) }}</span>
                        </template>
                    </div>
                </div>

                <div class="battle-unit__about-description-stats">
                    <div class="battle-unit__about-description-stat">
                        <div>
                            <span class="battle-unit__about-description-label">AC:</span>
                            <span>{{ unitArmor }}</span>
                        </div>
                    </div>

                    <div class="battle-unit__about-description-stat">
                        <span class="battle-unit__about-description-label">HP:</span>
                        <span>{{ unit.currentHp }}/{{ unit.hp }}</span>
                    </div>
                </div>
            </div>

            <div class="battle-unit__about-hp">
                <v-button
                    class="battle-unit__about-hp-btn"
                    color="green"
                    label="Heal"
                    :disabled="preparing"
                    @click="setHP('heal')"
                />
                <input
                    class="battle-unit__about-hp-input"
                    type="number"
                    v-model="hp"
                    :disabled="preparing"
                />
                <v-button
                    class="battle-unit__about-hp-btn"
                    color="red"
                    label="Hit"
                    :disabled="preparing"
                    @click="setHP('hit')"
                />
            </div>

            <div class="battle-unit__about-initiative">
                <span>Initiative:</span>

                <span
                    v-if="!unit.class"
                    class="battle-unit__about-initiative-shape"
                >
                    <span>{{ unit.initiative }}</span>
                </span>

                <v-button
                    v-else
                    class="battle-unit__about-initiative-shape"
                    @click="openInitiativeModal"
                >
                    <span v-if="!unit.initiative">➕</span>
                    <span v-else>{{ unit.initiative }}</span>
                </v-button>

                <initiative-modal
                    v-model:open="isInitiativeModal"
                    @click="setCharacterInitiative"
                />
            </div>
        </div>

        <ul
            v-if="unit.actions"
            class="battle-unit__actions"
            :class="{ 'battle-unit__actions--disabled': disabled }"
        >
            <li v-for="action in unit.actions">
                <v-button
                    class="battle-unit__actions-btn"
                    color="gray"
                    @click="openActionModal(action)"
                >
                    <span>{{ action.name }}</span>
                    <span>{{ action.damage[0]?.damage_dice }}</span>
                </v-button>

                <action-modal
                    :open="isActionModal && actionData.name === action.name"
                    :action="actionData"
                    :actions="unit.actions"
                    @close="closeActionModal"
                />
            </li>

            <li v-for="spell in unit.spells">
                <v-button
                    class="battle-unit__actions-btn"
                    color="blue"
                    @click="openSpellModal(spell)"
                >
                    {{ spell.name }}
                </v-button>

                <spell-modal
                    :open="isSpellModal && spellData.name === spell.name"
                    :data="spellData"
                    @close="closeSpellModal"
                />
            </li>
        </ul>
    </div>
</template>

<script src="./index.js"></script>
<style src="./index.scss" scoped></style>
