<template>
	<v-modal :open="open">
		<div class="confirm-modal">
			<h3 class="confirm-modal__message">
				{{ message }}
			</h3>

			<div class="confirm-modal__btn-container">
				<button
					class="confirm-modal__btn confirm-modal__btn--cancel"
					@click="onCancel"
				>
					Cancel
				</button>
				<button
					class="confirm-modal__btn confirm-modal__btn--confirm"
					@click="onConfirm"
				>
					Confirm
				</button>
			</div>
		</div>
	</v-modal>
</template>

<script src="./index.js"></script>
<style src="./index.scss" scoped></style>
