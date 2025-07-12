<template>
    <v-drawer
        :open="open"
        @close="$emit('update:open', false)"
    >
        <div class="more-info">
            <div class="more-info__wrapper">
                <div class="more-info__inner more-info__inner">
                    <div class="more-info__col">
                        <div class="more-info__row">
                            <h2 class="more-info__row-label more-info__row-title">
                                {{ unit.name }}
                            </h2>

                            <div class="more-info__row-subtitle">
                                <span v-if="unit.class">
                                    {{ unit.class }}
                                </span>
                                <span v-else>
                                    {{ `${unit.size} ${unit.type}, ${unit.alignment}` }}
                                </span>
                            </div>
                        </div>

                        <div class="more-info__row">
                            <div>
                                <span class="more-info__row-label">
                                    {{ 'Armor class: ' }}
                                </span>
                                <span>{{ unit.defaultAC }}</span>
                                <button
                                    v-if="unit.class"
                                    class="more-info__btn more-info__btn--change"
                                >
                                    {{ 'change' }}
                                </button>
                            </div>

                            <div>
                                <span class="more-info__row-label">
                                    {{ 'Hit points: ' }}
                                </span>
                                <span>{{ unit.defaultHP }}</span>
                                <button
                                    v-if="unit.class"
                                    class="more-info__btn more-info__btn--change"
                                >
                                    {{ 'change' }}
                                </button>
                            </div>

                            <div v-if="unit.speed">
                                <span class="more-info__row-label">
                                    {{ 'Speed: ' }}
                                </span>
                                <span>{{ unit.speed }}</span>
                            </div>
                        </div>

                        <template v-if="unit.class">
                            <div class="more-info__row">
                                <div>
                                    <span class="more-info__row-label">
                                        {{ 'Level: ' }}
                                    </span>
                                    <span>{{ unit.lvl }}</span>
                                    <button class="more-info__btn more-info__btn--change">
                                        {{ 'change' }}
                                    </button>
                                </div>

                                <div>
                                    <span class="more-info__row-label">
                                        {{ 'Experiance: ' }}
                                    </span>
                                    <span>{{ formatEXP(unit.xp, unit.lvl) }}</span>
                                    <button class="more-info__btn more-info__btn--change">
                                        {{ 'change' }}
                                    </button>
                                </div>
                            </div>
                        </template>

                        <template v-else>
                            <div class="more-info__row">
                                <div class="more-info__stats">
                                    <div
                                        class="more-info__stat"
                                        v-for="item in Object.entries(unit.stats)"
                                        :key="item[0]"
                                    >
                                        <span class="more-info__row-label">
                                            {{ item[0] }}
                                        </span>
                                        <span>
                                            {{ item[1].count }}
                                        </span>
                                        <button class="more-info__btn more-info__btn--stat">
                                            {{ item[1].mod }}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div class="more-info__row">
                                <div>
                                    <span class="more-info__row-label">
                                        {{ 'Challenge rating: ' }}
                                    </span>
                                    <span>
                                        {{ formatCR(unit.CR) }}
                                        <span v-if="unit.xp">({{ unit.xp }} XP)</span>
                                    </span>
                                </div>

                                <div v-if="unit.proficiencyBonus">
                                    <span class="more-info__row-label">
                                        {{ 'Proficiency bonus: ' }}
                                    </span>
                                    <span>{{ unit.proficiencyBonus }}</span>
                                </div>

                                <div v-if="unit.passivePerception">
                                    <span class="more-info__row-label">
                                        {{ 'Passive perception: ' }}
                                    </span>
                                    <span>{{ unit.passivePerception }}</span>
                                </div>

                                <div v-if="unit.saves.length">
                                    <span class="more-info__row-label">
                                        {{ 'Sawing throws: ' }}
                                    </span>
                                    <span
                                        class="more-info__save"
                                        v-for="item in unit.saves"
                                        :key="item.name"
                                    >
                                        <span>{{ `${item.name}: ` }}</span>
                                        <button class="more-info__btn">
                                            {{ item.value }}
                                        </button>
                                    </span>
                                </div>

                                <div v-if="unit.skills.length">
                                    <span class="more-info__row-label">
                                        {{ 'Skills: ' }}
                                    </span>
                                    <span
                                        class="more-info__skill"
                                        v-for="item in unit.skills"
                                        :key="item.name"
                                    >
                                        <span>{{ `${item.name}: ` }}</span>
                                        <button class="more-info__btn">
                                            {{ item.value }}
                                        </button>
                                    </span>
                                </div>

                                <div v-if="unit.senses">
                                    <span class="more-info__row-label">
                                        {{ 'Senses: ' }}
                                    </span>
                                    <span>{{ unit.senses }}</span>
                                </div>

                                <div v-if="unit.languages">
                                    <span class="more-info__row-label">
                                        {{ 'Languages: ' }}
                                    </span>
                                    <span>{{ unit.languages || 'none' }}</span>
                                </div>
                            </div>

                            <div
                                class="more-info__row"
                                v-if="isDefence"
                            >
                                <div v-if="isConditionImmunities">
                                    <span class="more-info__row-label">
                                        {{ 'Condition immunities: ' }}
                                    </span>
                                    <span>{{ unit.conditionImmunities.join('; ') }}</span>
                                </div>

                                <div v-if="isDamageImmunities">
                                    <span class="more-info__row-label">
                                        {{ 'Damage immunities: ' }}
                                    </span>
                                    <span>{{ unit.damageImmunities.join('; ') }}</span>
                                </div>

                                <div v-if="isDamageResistances">
                                    <span class="more-info__row-label">
                                        {{ 'Damage resistances: ' }}
                                    </span>
                                    <span>{{ unit.damageResistances.join('; ') }}</span>
                                </div>

                                <div v-if="isDamageVulnerabilities">
                                    <span class="more-info__row-label">
                                        {{ 'Damage vulnerabilities: ' }}
                                    </span>
                                    <span>{{ unit.damageVulnerabilities.join('; ') }}</span>
                                </div>
                            </div>
                        </template>
                    </div>

                    <div
                        v-if="!unit.class"
                        class="more-info__col"
                    >
                        <div
                            v-if="unit.actions.length"
                            class="more-info__row"
                        >
                            <div class="more-info__row-title more-info__row-title--small">
                                {{ 'Actions' }}
                            </div>

                            <ul>
                                <li
                                    class="more-info__action"
                                    v-for="action in unit.actions"
                                    :key="action.name"
                                >
                                    <span class="more-info__action-name">
                                        {{ `${action.name}: ` }}
                                    </span>
                                    <span class="more-info__action-desc">
                                        {{ action.desc }}
                                    </span>
                                </li>
                            </ul>
                        </div>

                        <div
                            v-if="unit.spells.length"
                            class="more-info__row"
                        >
                            <div class="more-info__row-title more-info__row-title--small">
                                {{ 'Spells' }}
                            </div>

                            <ul>
                                <li
                                    class="more-info__action"
                                    v-for="spell in unit.spells"
                                    :key="spell.name"
                                >
                                    <span class="more-info__action-name">
                                        {{ `${spell.name}: ` }}
                                    </span>
                                    <span class="more-info__action-desc">
                                        {{ spell.desc }}
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </v-drawer>
</template>

<script src="./index.js"></script>
<style src="./index.scss" scoped></style>
