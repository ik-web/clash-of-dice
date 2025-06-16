<template>
    <div class="page-layout">
        <header class="page-layout__header">
            <div class="page-layout__logo">
                <img
                    class="page-layout__logo-img"
                    alt="Logo"
                    :src="logoHref"
                />
                <span class="page-layout__logo-text">Monster fighting</span>
            </div>

            <nav class="page-layout__nav">
                <router-link
                    v-for="page in pages"
                    :key="page.path"
                    :to="page.path"
                    :title="page.name"
                >
                    {{ page.name }}
                </router-link>
            </nav>
        </header>

        <main class="page-layout__main">
            <slot></slot>
        </main>
    </div>
</template>

<script src="./index.js"></script>
<style src="./index.scss" scoped></style>
