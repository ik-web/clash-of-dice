<template>
	<button
		:class="['button', `button--${color}`, { 'button--upper': upper }]"
		:title="title || label"
		:disabled="disabled"
		@click="onClick"
	>
		<slot>
			{{ label }}
		</slot>
	</button>
</template>

<script src="./index.js"></script>
<style src="./index.scss" scoped></style>
