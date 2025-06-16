<template>
    <page-layout class="home-page">
        <ul class="options">
            <li
                class="option"
                v-for="option in options"
                :key="option.href"
            >
                <router-link
                    :to="option.href"
                    :title="option.name"
                >
                    {{ option.name }}
                </router-link>
            </li>
        </ul>
    </page-layout>
</template>

<script src="./index.js"></script>
<style src="./index.scss" scoped></style>
