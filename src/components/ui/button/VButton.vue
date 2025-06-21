<template>
	<button
		:class="[
			'button',
			`button--${color}`,
			{ 'button--bold': bold },
			{ 'button--upper': upper },
		]"
		:type="type"
		:title="title || label"
		:disabled="disabled"
		@click="$emit('click', $event)"
	>
		<slot>
			{{ label }}
		</slot>
	</button>
</template>

<script src="./index.js"></script>
<style src="./index.scss" scoped></style>
