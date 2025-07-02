<template>
    <transition name="fade">
        <div
            v-show="open"
            class="modal"
        >
            <div
                class="modal__container"
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
<style src="./index.scss" scoped></style>
