<template>
	<transition name="modal">
		<div
			v-show="open"
			class="modal"
		>
			<div class="modal__inner">
				<slot></slot>
			</div>
		</div>
	</transition>
</template>

<script src="./index.js"></script>
<style src="./index.scss" scoped></style>
