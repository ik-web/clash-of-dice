<template>
    <transition name="drawer">
        <div
            v-show="open"
            class="drawer"
            @click="onMaskClick"
        >
            <div
                :class="`drawer__container ${className}`"
                aria-modal="true"
                ref="drawerContainer"
            >
                <button
                    class="drawer__btn-close"
                    @click="closeDrawer"
                ></button>

                <slot></slot>
            </div>
        </div>
    </transition>
</template>

<script src="./index.js"></script>
<style src="./index.scss" scoped></style>
