<template>
    <div class="character-form">
        <h2 class="character-form__title">
            <template v-if="editMode">Edit {{ charForm.name }}</template>
            <template v-else>Add new character</template>
        </h2>

        <div class="character-form__fields">
            <label class="character-form__field">
                <span>Name:</span>
                <input
                    class="character-form__input"
                    type="text"
                    name="name"
                    v-model="charForm.name"
                    :disabled="editMode"
                />
            </label>

            <label class="character-form__field">
                <span>Class:</span>
                <select
                    class="character-form__input"
                    name="class"
                    v-model="charForm.class"
                    :disabled="editMode"
                >
                    <option
                        v-for="charClass in classes"
                        :value="charClass"
                        :key="charClass"
                    >
                        {{ charClass }}
                    </option>
                </select>
            </label>

            <label class="character-form__field">
                <span>Level:</span>
                <select
                    class="character-form__input"
                    name="class"
                    v-model="charForm.level"
                >
                    <option
                        v-for="level in leveling.total"
                        :value="level"
                        :key="level"
                    >
                        {{ level }}
                    </option>
                </select>
            </label>

            <label class="character-form__field">
                <span>Experience:</span>
                <input
                    class="character-form__input"
                    type="number"
                    name="exp"
                    v-model="charForm.exp"
                />
            </label>

            <label class="character-form__field">
                <span>Hit points (HP):</span>
                <input
                    class="character-form__input"
                    type="number"
                    name="hp"
                    v-model="charForm.hp"
                />
            </label>

            <label class="character-form__field">
                <span>Armor class (AC):</span>
                <input
                    class="character-form__input"
                    type="number"
                    name="hp"
                    v-model="charForm.armor[0].value"
                />
            </label>
        </div>

        <div
            v-if="editMode"
            class="character-form__btn-container"
        >
            <v-button
                color="gray"
                label="Cancel"
                upper
                @click="onCancel"
            />
            <v-button
                color="green"
                label="Accept"
                upper
                @click="onSubmit"
            />
        </div>

        <v-button
            v-else
            class="character-form__btn"
            color="green"
            label="Add character"
            upper
            @click="onSubmit"
        />
    </div>
</template>

<script src="./index.js"></script>
<style src="./index.scss" scoped></style>
