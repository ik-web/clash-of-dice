import { defineComponent } from 'vue';
import { formatHP, formatImg } from '@/utils/formatter';
import UnitImg from '@/components/shared/unit-img/UnitImg.vue';

export default defineComponent({
	components: { UnitImg },

	props: {
		unit: {
			type: Object,
			default: {},
		},
		active: {
			type: Boolean,
			default: false,
		},
	},

	setup() {
		const isOut = false;
		const isActive = false;
		const isWaiting = false;
		const isBloodied = false;

		return {
			formatHP,
			formatImg,

			isOut,
			isActive,
			isWaiting,
			isBloodied,
		};
	},
});
