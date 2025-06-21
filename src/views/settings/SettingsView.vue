<template>
    <page-layout>
        <div class="settings">
            <v-button
                class="settings__btn"
                color="red"
                title="Clear browser data"
                label="Clear browser data"
                @click="onClearBrowserData"
            />

            <confirm-modal
                v-model:open="isConfirmModal"
                @confirm="clearEncounterState"
            >
                <div class="settings__warning">
                    <span>
                        {{
                            "Are you sure you want to clear the data stored in your browser's memory?"
                        }}
                    </span>
                    <span>
                        {{ 'All characters, monsters, encounters, parties will be deleted.' }}
                    </span>
                </div>
            </confirm-modal>
        </div>
    </page-layout>
</template>

<script src="./index.js"></script>
<style src="./index.scss" scoped></style>
