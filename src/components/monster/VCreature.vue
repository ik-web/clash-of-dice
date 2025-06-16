<template>
    <div class="creature">
        <div class="creature__content">
            <div class="creature__img">
                <img
                    alt="Creature image"
                    :src="`https://www.dnd5eapi.co${creature.image}`"
                />
            </div>

            <div class="creature__about">
                <div>
                    <h2 class="creature__name">
                        {{ creature.name }}
                    </h2>

                    <div
                        v-if="creature.class"
                        class="creature__rating"
                    >
                        Rating: {{ creature.class }}
                    </div>

                    <div
                        v-if="creature.challenge_rating"
                        class="creature__rating"
                    >
                        Rating: {{ creature.challenge_rating }}
                    </div>
                </div>

                <div>
                    <div>
                        <div class="initiative">
                            <h3>Initiative</h3>
                            <span v-if="initiative">{{ initiative }}</span>
                            <button
                                v-else
                                @click="setInitiative"
                            >
                                {{ dexMod > 0 ? `+${dexMod}` : dexMod }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script src="./index.js"></script>
<style src="./index.scss" scoped></style>
