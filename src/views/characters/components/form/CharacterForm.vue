<template>
	<form
		class="character-form"
		@submit.prevent="onCharSubmit"
	>
		<h2 class="character-form__title">
			<template v-if="editMode">Edit character</template>
			<template v-else>Add character</template>
		</h2>

		<div class="character-form__fields">
			<label class="character-form__field">
				<span>Name:</span>
				<input
					class="character-form__input"
					type="text"
					name="name"
					v-model="charForm.name"
				/>
			</label>

			<label class="character-form__field">
				<span>Class:</span>
				<select
					class="character-form__input"
					name="class"
					v-model="charForm.class"
				>
					<option
						v-for="charClass in classes"
						:value="charClass"
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
					name="experience"
					v-model="charForm.experience"
				/>
			</label>

			<label class="character-form__field">
				<span>Hit points:</span>
				<input
					class="character-form__input"
					type="number"
					name="hp"
					v-model="charForm.hp"
				/>
			</label>

			<label class="character-form__field">
				<span>Armor class:</span>
				<input
					class="character-form__input"
					type="number"
					name="hp"
					v-model="charForm.ac"
				/>
			</label>

			<button
				class="character-form__btn"
				type="submit"
			>
				Submit
			</button>
		</div>
	</form>
</template>

<script src="./index.js"></script>
<style src="./index.scss" scoped></style>
