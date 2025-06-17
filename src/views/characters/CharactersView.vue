<template>
	<page-layout class="character-page">
		<my-character
			v-if="character.name && !editMode"
			v-model:editMode="editMode"
		/>

		<character-form
			v-else
			v-model:editMode="editMode"
		/>
	</page-layout>
</template>

<script src="./index.js"></script>
