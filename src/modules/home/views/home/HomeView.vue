<template>
    <page-layout>
        <div class="home">
            <ul class="options">
                <li
                    v-for="option in options"
                    :key="option.href"
                >
                    <button
                        class="option"
                        :title="option.name"
                        @click="redirectTo(option.href)"
                    >
                        {{ option.name }}
                    </button>
                </li>
            </ul>
        </div>
    </page-layout>
</template>

<script src="./index.js"></script>
<style src="./index.scss" scoped></style>
