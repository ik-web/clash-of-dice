<template>
    <transition name="fade">
        <div
            class="modal"
            v-show="open"
        >
            <div
                :class="`modal__container ${className}`"
                aria-modal="true"
                :style="`max-width: ${width};`"
            >
                <button
                    class="modal__btn-close"
                    @click="closeModal"
                ></button>

                <slot></slot>
            </div>
        </div>
    </transition>
</template>

<script src="./index.js"></script>
<style src="./index.scss"></style>
