<template>
    <v-drawer
        :open="open"
        @close="$emit('update:open', false)"
    >
        <div class="char-builder">
            <div class="char-builder__body">
                <div class="char-builder__col">
                    <h2 class="char-builder__title">
                        {{ 'Add character' }}
                    </h2>

                    <form
                        class="char-builder__form"
                        @submit.prevent="prepareChar"
                    >
                        <div class="char-builder__fields">
                            <label class="char-builder__field">
                                <span>Name:</span>
                                <input
                                    type="text"
                                    name="name"
                                    v-model="formData.name"
                                />
                            </label>

                            <label class="char-builder__field">
                                <span>Class:</span>
                                <v-select
                                    v-model="formData.class"
                                    :options="classOptions"
                                />
                            </label>

                            <div class="char-builder__double-field">
                                <label class="char-builder__field">
                                    <span>Level:</span>
                                    <v-select
                                        v-model="formData.lvl"
                                        :options="charLevels"
                                    />
                                </label>

                                <label class="char-builder__field">
                                    <span>Experience:</span>
                                    <input
                                        type="number"
                                        name="xp"
                                        v-model="formData.xp"
                                    />
                                </label>
                            </div>

                            <div class="char-builder__double-field">
                                <label class="char-builder__field">
                                    <span>Armor class (AC):</span>
                                    <input
                                        type="number"
                                        name="ac"
                                        v-model="formData.defaultAC"
                                    />
                                </label>

                                <label class="char-builder__field">
                                    <span>Hit points (HP):</span>
                                    <input
                                        type="number"
                                        name="hp"
                                        v-model="formData.defaultHP"
                                    />
                                </label>
                            </div>
                        </div>

                        <v-button
                            class="char-builder__form-btn"
                            color="green"
                            label="Add"
                            :type="'submit'"
                            :disabled="isAddDisabled"
                            bold
                            upper
                        />
                    </form>
                </div>

                <div class="char-builder__col">
                    <h2 class="char-builder__title">
                        {{ 'Prepared characters' }}
                    </h2>

                    <div class="char-builder__characters">
                        <div
                            class="char-builder__char"
                            v-for="char in characters"
                            :key="char.id"
                            :title="char.name"
                        >
                            <span :title="char.name">
                                {{ `${char.name} (${char.class})` }}
                            </span>

                            <span>AC: {{ char.defaultAC }}</span>
                            <span>HP: {{ char.defaultHP }}</span>

                            <div class="char-builder__char-actions">
                                <v-button
                                    class="char-builder__char-btn"
                                    color="red"
                                    label="−"
                                    bold
                                    @click="removeChar(char.id)"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="char-builder__footer">
                <v-button
                    color="gray"
                    label="Close"
                    bold
                    upper
                    @click="$emit('update:open')"
                />
                <v-button
                    color="green"
                    label="Confirm"
                    bold
                    upper
                    @click="addCharacters"
                />
            </div>
        </div>
    </v-drawer>
</template>

<script src="./index.js"></script>
<style src="./index.scss" scoped></style>
