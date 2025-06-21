<template>
    <div class="page-layout">
        <header class="page-layout__header">
            <router-link
                class="page-layout__logo"
                :to="'/'"
            >
                <img
                    class="page-layout__logo-img"
                    alt="Logo"
                    :src="logoHref"
                />
                <span class="page-layout__logo-text">Clash of Dice</span>
            </router-link>

            <nav
                class="page-layout__nav"
                :class="{ 'page-layout__nav--active': isNavigation }"
            >
                <router-link
                    :class="{ 'page-layout__nav-link-active': checkParentRoute(page.path) }"
                    v-for="page in pages"
                    :key="page.path"
                    :to="page.path"
                    :title="page.name"
                >
                    {{ page.name }}
                </router-link>
            </nav>

            <button
                class="page-layout__nav-btn"
                @click="toggleNav"
            >
                Menu
            </button>
        </header>

        <nav
            v-if="subNavigation.length"
            class="page-layout__sub-nav"
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

        <main class="page-layout__main">
            <slot></slot>
        </main>
    </div>
</template>

<script src="./index.js"></script>
<style src="./index.scss" scoped></style>
