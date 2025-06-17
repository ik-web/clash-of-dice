<template>
	<div class="character">
		<div class="character__class">
			<img
				class="character__img"
				alt="Character image"
				:src="character.img"
			/>
		</div>

		<div class="character__stats">
			<h2 class="character__stat character__stat--name">
				<span>{{ character.name }}</span>
			</h2>

			<div class="character__stat">
				<span>Level: </span>
				<span>{{ character.level }}</span>
			</div>

			<div class="character__stat">
				<span>Experience: </span>
				<span>{{ `${character.experience}` }}/{{ totalExpByLvl }}</span>
			</div>

			<div class="character__stat">
				<span>Hit points: </span>
				<span>{{ character.hp }}</span>
			</div>

			<div class="character__stat">
				<span>Armor class: </span>
				<span>{{ character.ac }}</span>
			</div>

			<div class="character__btn-container">
				<button
					class="character__btn character__btn--edit"
					@click="onCharEdit"
				>
					Edit
				</button>
				<button
					class="character__btn character__btn--delete"
					@click="onCharDelete"
				>
					Delete
				</button>
			</div>
		</div>

		<v-modal :open="isConfirmModal">
			<div class="character__confirm-modal">
				<h3 class="character__confirm-modal-title">
					Are you sure you want to delete character?
				</h3>

				<div class="character__confirm-modal-btns">
					<button
						class="character__btn character__btn--cancel"
						@click="onCancelDelete"
					>
						Cancel
					</button>
					<button
						class="character__btn character__btn--delete"
						@click="onConfirmDelete"
					>
						Confirm
					</button>
				</div>
			</div>
		</v-modal>
	</div>
</template>

<script src="./index.js"></script>
<style src="./index.scss" scoped></style>
