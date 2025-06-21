<template>
    <div class="select">
        <input
            class="select__input"
            ref="selectInput"
            type="button"
            :class="{ 'select__input--placheholder': !modelValue }"
            :value="label"
            :disabled="disabled"
            @click.prevent="toggleMenu"
        />

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
                    @click.prevent="onOptionClick(option)"
                >
                    {{ option.label || option }}
                </button>
            </div>
        </div>
    </div>
</template>

<script src="./index.js"></script>
<style src="./index.scss" scoped></style>
