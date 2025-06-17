<template>
	<div class="page-layout">
		<header class="page-layout__header">
			<div class="page-layout__logo">
				<img
					class="page-layout__logo-img"
					alt="Logo"
					:src="logoHref"
				/>
				<span class="page-layout__logo-text">Clash of Dice</span>
			</div>

			<nav
				class="page-layout__nav"
				:class="{ 'page-layout__nav--active': isNavigation }"
			>
				<router-link
					v-for="page in pages"
					:key="page.path"
					:to="page.path"
					:title="page.name"
				>
					{{ page.name }}
				</router-link>
			</nav>

			<button
				class="page-layout__nav-btn"
				@click="toggleNav"
			>
				Menu
			</button>
		</header>

		<main class="page-layout__main">
			<slot></slot>
		</main>
	</div>
</template>

<script src="./index.js"></script>
<style src="./index.scss" scoped></style>
