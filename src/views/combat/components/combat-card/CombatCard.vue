<template>
    <div
        :class="[
            'combat-card',
            {
                'combat-card--out': isOut,
                'combat-card--wait': isWaiting,
                'combat-card--active': isActive,
                'combat-card--bloodied': isBloodied,
            },
        ]"
    >
        <div class="combat-card__img">
            <unit-img
                size="196px"
                alt="Unit image"
                :src="formatImg(unit.image)"
                cover
            />
        </div>

        <h3 class="combat-card__name">
            {{ unit.name }}
        </h3>

        <div class="combat-card__info">
            <div class="combat-card__info-grid">
                <button
                    class="combat-card__info-btn"
                    title="Armor class (AC)"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 -960 960 960"
                    >
                        <path
                            d="M480-80q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Z"
                        />
                    </svg>
                    <span>{{ unit.ac }}</span>
                </button>
                <button
                    class="combat-card__info-btn"
                    title="Hit points (HP)"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 -960 960 960"
                    >
                        <path
                            d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z"
                        />
                    </svg>
                    <span>{{ unit.currentHP }}</span>
                </button>
                <button
                    class="combat-card__info-btn"
                    title="Initiative"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 -960 960 960"
                    >
                        <path
                            d="M757.77-114.08 638.08-233.16l-88 88-19.54-19.53q-20.69-20.7-20.69-51.23 0-30.54 20.69-51.23l166.31-166.31q20.69-20.69 51.23-20.69 30.53 0 51.23 20.69l19.53 19.54-88 88 119.08 119.69q10.85 10.84 10.85 25.31 0 14.46-10.85 25.3l-41.54 41.54q-10.84 10.85-25.3 10.85-14.47 0-25.31-10.85ZM860-732.46 412.15-284.23l17.31 16.69q20.69 20.69 20.69 51.23 0 30.54-20.69 51.23l-19.54 19.54-88-88-119.69 119.08q-10.84 10.84-25.31 10.84-14.46 0-25.3-10.84L110.08-156q-10.85-10.85-10.85-25.31 0-14.46 10.85-25.31l119.08-119.69-88-88 19.53-19.54q20.7-20.69 51.23-20.69 30.54 0 51.23 20.69l17.08 17.7L728.46-864H860v131.54ZM291.85-540.23 100-732.46V-864h131.54L423-672.15 291.85-540.23Z"
                        />
                    </svg>
                    <span>{{ +unit.initiative }}</span>
                </button>
                <button
                    class="combat-card__info-btn"
                    title="Show details and actions"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 -960 960 960"
                    >
                        <path
                            d="M240-280h280v-80H240v80Zm400 0h80v-400h-80v400ZM240-440h280v-80H240v80Zm0-160h280v-80H240v80ZM80-120v-720h800v720H80Zm80-80h640v-560H160v560Zm0 0v-560 560Z"
                        />
                    </svg>
                    <span>More</span>
                </button>
            </div>

            <div class="combat-card__info-indicator"></div>
        </div>
    </div>
</template>

<script src="./index.js"></script>
<style src="./index.scss" scoped></style>
