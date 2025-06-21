<template>
    <transition name="fade">
        <div
            v-show="open"
            class="modal"
        >
            <slot></slot>
        </div>
    </transition>
</template>

<script src="./index.js"></script>
<style src="./index.scss" scoped></style>
