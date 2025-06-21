<template>
    <page-layout>
        <div class="score">
            <div class="score__table">
                <table>
                    <tbody>
                        <template
                            v-for="character in score"
                            :key="character.id"
                        >
                            <tr class="character-row">
                                <td :colspan="4">{{ character.name }} ({{ character.class }})</td>
                            </tr>

                            <tr class="monster-header">
                                <th>Monster</th>
                                <th>HP</th>
                                <th>CR</th>
                                <th>Count</th>
                            </tr>

                            <tr
                                class="monster-row"
                                v-for="(monster, key) in character.score"
                                :key="key"
                            >
                                <td>{{ monster.name }}</td>
                                <td>{{ monster.hp }}</td>
                                <td>{{ monster.cr }}</td>
                                <td>{{ monster.count }}</td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
        </div>
    </page-layout>
</template>

<script src="./index.js"></script>
<style src="./index.scss" scoped></style>
