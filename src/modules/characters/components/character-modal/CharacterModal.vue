<template>
    <v-modal :open="open">
        <div class="character-modal">
            <h2 class="character-modal__title">
                <template v-if="editMode">Edit {{ charForm.name }}</template>
                <template v-else>Add a character</template>
            </h2>

            <div class="character-modal__fields">
                <label class="character-modal__field">
                    <span>Name:</span>
                    <input
                        class="character-modal__input"
                        type="text"
                        name="name"
                        v-model="charForm.name"
                        :disabled="editMode"
                    />
                </label>

                <label class="character-modal__field">
                    <span>Class:</span>
                    <v-select
                        v-model="charForm.class"
                        :options="classes"
                        :disabled="editMode"
                    />
                </label>

                <!-- <label class="character-modal__field">
                    <span>Level:</span>
                    <v-select
                        class="character-modal__input"
                        v-model="charForm.level"
                    >
                        <option
                            v-for="level in leveling.total"
                            :value="level"
                            :key="level"
                        >
                            {{ level }}
                        </option>
                    </v-select>
                </label> -->

                <label class="character-modal__field">
                    <span>Experience:</span>
                    <input
                        class="character-modal__input"
                        type="number"
                        name="exp"
                        v-model="charForm.exp"
                    />
                </label>

                <label class="character-modal__field">
                    <span>Hit points (HP):</span>
                    <input
                        class="character-modal__input"
                        type="number"
                        name="hp"
                        v-model="charForm.hp"
                    />
                </label>

                <label class="character-modal__field">
                    <span>Armor class (AC):</span>
                    <input
                        class="character-modal__input"
                        type="number"
                        name="ac"
                        v-model="charForm.armor[0].value"
                    />
                </label>
            </div>

            <div class="character-modal__btn-container">
                <v-button
                    color="gray"
                    label="Cancel"
                    bold
                    upper
                    @click="onCancel"
                />
                <v-button
                    color="green"
                    label="Save"
                    bold
                    upper
                    :disabled="isSaveDisabled"
                    @click="onSave"
                />
            </div>
        </div>
    </v-modal>
</template>

<script src="./index.js"></script>
<style src="./index.scss" scoped></style>
