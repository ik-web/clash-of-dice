<template>
    <div class="home-page">
        <main>
            <div class="monsters">
                <ul class="monsters__list">
                    <li
                        class="monster"
                        v-for="(monster, i) in monsters"
                        :key="monster"
                    >
                        <button
                            class="monster__btn"
                            @click="onMonsterBtnClick(monster.index)"
                        >
                            {{ monster.name }}
                        </button>
                    </li>
                </ul>

                <div
                    v-if="selectedMonster"
                    class="selected-monster"
                >
                    <div
                        v-show="loading"
                        class="selected-monster__loading"
                    >
                        Loading...
                    </div>

                    <div class="selected-monster__content">
                        <img
                            v-show="!loading"
                            class="selected-monster__img"
                            alt="Monster image"
                            :src="`https://www.dnd5eapi.co${selectedMonster.image}`"
                            @load="onImageLoad"
                        />

                        <h2
                            v-show="!loading"
                            class="selected-monster__title"
                        >
                            {{ selectedMonster.name }}
                        </h2>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script src="./index.js"></script>
<style src="./index.scss" scoped></style>
