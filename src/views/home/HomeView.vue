<template>
    <page-layout>
        <div class="home">
            <div class="home__options">
                <router-link
                    class="home__option"
                    v-for="option in options"
                    :title="option.name"
                    :key="option.key"
                    :to="option.href"
                >
                    {{ option.label }}
                </router-link>
            </div>
        </div>
    </page-layout>
</template>

<script src="./index.js"></script>
<style src="./index.scss" scoped></style>
