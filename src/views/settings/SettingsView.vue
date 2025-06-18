<template>
	<page-layout class="settings-page">
		<div class="settings">
			<form
				class="settings__form"
				@submit.prevent="onSubmit"
			>
				<h2 class="settings__title">Settings</h2>

				<div class="settings__fields">
					<label class="settings__field">
						<span>Mode:</span>
						<select
							class="settings__input"
							name="mode"
							v-model="settings.mode"
						>
							<option
								v-for="mode in settings.modes"
								:key="mode.value"
								:value="mode.value"
							>
								{{ mode.label }}
							</option>
						</select>
					</label>

					<label
						v-if="settings.mode !== 'infinity'"
						class="settings__field"
					>
						<span>Challenge rating (CR):</span>
						<select
							class="settings__input"
							name="challenge"
							v-model="settings.cr"
						>
							<option
								v-for="cr in challenges"
								:key="cr"
								:value="cr"
							>
								{{ formatCR(cr) }}
							</option>
						</select>
					</label>

					<label
						v-if="settings.mode === 'selected'"
						class="settings__field"
					>
						<span>Monster:</span>

						<div class="settings__monster-select">
							<select
								class="settings__input"
								name="challenge"
								v-model="settings.monsterIndex"
							>
								<option
									v-for="monster in monsters"
									:key="monster.index"
									:value="monster.index"
								>
									{{ monster.name }}
								</option>
							</select>
							<button
								class="settings__btn"
								:disabled="loading"
								@click="onSelectMonster()"
							>
								Select
							</button>
						</div>
					</label>

					<label
						v-if="settings.mode === 'infinity'"
						class="settings__field"
					>
						<span>Difficulty:</span>
						<select
							class="settings__input"
							name="challenge"
							v-model="settings.difficulty"
						>
							<option
								v-for="difficulty in settings.difficulties"
								:key="difficulty.value"
								:value="difficulty.value"
							>
								{{ difficulty.label }}
							</option>
						</select>
					</label>

					<button
						v-if="settings.mode === 'random' && monsters"
						class="settings__btn"
						:disabled="loading"
						@click="addRandomMonster"
					>
						Add monster
					</button>
				</div>
			</form>

			<ul class="settings__selected-monsters">
				<li
					v-if="settings.mode === 'infinity'"
					class="settings__infinity-message"
				>
					<span>Monsters are added automatically during the battle.</span>
					<span>
						The challenge rating (CR) is calculated according to the level of the
						character and the set difficulty.
					</span>
				</li>

				<template v-else>
					<li
						class="settings__selected-monster"
						v-for="monster in selectedMonsters"
						:key="monster.name"
					>
						<span>
							<img
								class="settings__selected-monster-img"
								alt="Monster image"
								:src="`https://www.dnd5eapi.co${monster.image}`"
							/>
							<span>
								{{ monster.name }} (CR:{{ formatCR(monster.challenge_rating) }})
							</span>
						</span>
						<button @click="onRemoveMonster(monster.id)">
							<svg
								class="settings__selected-monster-svg-delete"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 -960 960 960"
							>
								<path
									d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"
								/>
							</svg>
						</button>
					</li>
				</template>
			</ul>

			<button
				class="settings__btn settings__btn--reset"
				@click="onResetSettings"
			>
				Reset settings
			</button>
		</div>

		<confirm-modal
			v-model:open="isConfirmModal"
			message="Are you sure you want to reset settings?"
			@confirm="onConfirmReset"
		/>
	</page-layout>
</template>

<script src="./index.js"></script>
<style src="./index.scss" scoped></style>
