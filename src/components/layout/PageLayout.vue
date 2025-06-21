<template>
    <div class="page-layout">
        <header class="page-layout__header">
            <router-link
                class="page-layout__header-logo"
                :to="'/'"
            >
                <img
                    class="page-layout__header-logo-img"
                    alt="Logo"
                    :src="logoHref"
                />
                <span class="page-layout__header-logo-text">
                    {{ 'Clash of Dice' }}
                </span>
            </router-link>

            <nav
                class="page-layout__header-menu"
                :class="{ 'page-layout__header-menu--active': isMenu }"
            >
                <router-link
                    :class="{ 'is-active': checkActiveLink(link.name) }"
                    v-for="link in navigation"
                    :key="link.path"
                    :to="link.path"
                    :title="link.label"
                >
                    {{ link.label }}
                </router-link>
            </nav>

            <button
                class="page-layout__header-menu-btn"
                @click="toggleMenu"
            >
                Menu
            </button>
        </header>

        <nav
            v-if="subNavigation"
            class="page-layout__navigation"
        >
            <router-link
                v-for="link in subNavigation"
                :key="link.path"
                :to="link.path"
                :title="link.label"
            >
                {{ link.label }}
            </router-link>
        </nav>

        <main
            class="page-layout__main"
            :class="`page-layout__main--${currentPage}`"
        >
            <div class="page-layout__overlay">
                <slot></slot>
            </div>
        </main>
    </div>
</template>

<script src="./index.js"></script>
<style src="./index.scss" scoped></style>
