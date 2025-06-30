<template>
	<div class="unit">
		<unit-img
			alt="Image"
			:src="formatImg(unit.image)"
		/>

		<div class="unit__info">
			<div class="unit__name">
				{{ unit.name }}
			</div>

			<div class="unit__row">
				<span>
					<span>{{ unit.lvl ? `Level: ` : `CR: ` }}</span>
					<span>{{ unit.lvl || formatCR(unit.cr) }}</span>
				</span>
				<span>
					<span>{{ 'AC: ' }}</span>
					<span>{{ unit.ac }}</span>
				</span>
			</div>

			<div class="unit__row">
				<span>
					<span>{{ 'Exp: ' }}</span>
					<span>{{ formatXP(unit.xp, unit.lvl) }}</span>
				</span>
				<span>
					<span>{{ 'HP: ' }}</span>
					<span>{{ formatHP(unit.currentHP, unit.hp) }}</span>
				</span>
			</div>
		</div>

		<div class="unit__action">
			<button
				class="unit__action-btn"
				ref="actionBtn"
				:class="{ 'unit__action-btn--active': isMenuOpened }"
				@click="toggleMenu()"
			>
				<svg
					viewBox="0 -960 960 960"
					height="24px"
					width="24px"
				>
					<path
						d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"
					/>
				</svg>
			</button>

			<div
				v-show="isMenuOpened"
				class="unit__menu"
				ref="actionMenu"
			>
				<button
					class="unit__menu-btn"
					@click="$emit('refresh', unit)"
				>
					Refresh
				</button>
				<!-- <button
                    class="unit__menu-btn"
                    v-if="unit.class"
                    @click="$emit('edit', unit)"
                >
                    Edit
                </button> -->
				<button
					class="unit__menu-btn"
					@click="$emit('delete', unit.id)"
				>
					Delete
				</button>
			</div>
		</div>
	</div>
</template>

<script src="./index.js"></script>
<style src="./index.scss" scoped></style>
