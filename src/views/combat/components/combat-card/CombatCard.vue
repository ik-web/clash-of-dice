<template>
	<div
		:class="[
			'combat-card',
			{
				'combat-card--out': isOut,
				'combat-card--wait': isWaiting,
				'combat-card--active': isActive,
				'combat-card--bloodied': isBloodied,
			},
		]"
	>
		<div class="combat-card__img">
			<unit-img
				size="196px"
				alt="Unit image"
				:src="formatImg(unit.image)"
				cover
			/>
		</div>

		<h3 class="combat-card__name">
			{{ unit.name }}
		</h3>

		<div class="combat-card__info">
			<div class="combat-card__info-grid">
				<button
					class="combat-card__info-btn"
					title="Armor class (AC)"
				>
					<span>⛊</span>
					<span>{{ unit.ac }}</span>
				</button>
				<button
					class="combat-card__info-btn"
					title="Hit points (HP)"
				>
					<span>❤︎</span>
					<span>{{ unit.currentHP }}</span>
				</button>
				<button
					class="combat-card__info-btn"
					title="Initiative"
				>
					<span>♛</span>
					<span>{{ +unit.initiative }}</span>
				</button>
				<button
					class="combat-card__info-btn"
					title="Additional menu"
				>
					<span>⚔︎</span>
					<span>Menu</span>
				</button>
			</div>

			<div class="combat-card__info-indicator"></div>
		</div>
	</div>
</template>

<script src="./index.js"></script>
<style src="./index.scss" scoped></style>
