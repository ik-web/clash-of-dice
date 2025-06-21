<template>
    <div class="select">
        <button
            class="select__button"
            ref="selectButton"
            :disabled="disabled"
            @click="toggleMenu"
        >
            {{ label }}
        </button>

        <div
            v-show="isOpen"
            class="select__menu"
        >
            <div class="select__menu-list">
                <button
                    class="select__menu-option"
                    :class="{ 'select__menu-option--active': checkActiveOption(option) }"
                    v-for="option in options"
                    :key="option.value || option"
                    :disabled="disabled"
                    @click="onOptionClick(option)"
                >
                    {{ option.label || option }}
                </button>
            </div>
        </div>
    </div>
</template>

<script src="./index.js"></script>
<style src="./index.scss" scoped></style>
