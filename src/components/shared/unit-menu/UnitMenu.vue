<template>
    <div class="unit-menu">
        <button
            class="unit-menu__btn"
            ref="menuBtn"
            :class="{ 'unit-menu__btn--active': isOpened }"
            @click="toggleMenu()"
        >
            <svg
                viewBox="0 -960 960 960"
                height="24px"
                width="24px"
            >
                <path
                    d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"
                />
            </svg>
        </button>

        <div
            v-show="isOpened"
            class="unit-menu__popup"
            ref="menuPopup"
        >
            <slot></slot>
        </div>
    </div>
</template>

<script src="./index.js"></script>
<style src="./index.scss" scoped></style>
