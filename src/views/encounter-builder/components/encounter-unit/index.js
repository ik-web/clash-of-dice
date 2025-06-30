import { defineComponent, onBeforeMount, onMounted, ref, useTemplateRef } from 'vue';
import { formatHP, formatImg, formatXP, formatCR } from '@/utils/formatter';
import VButton from '@/components/ui/button/VButton.vue';
import UnitImg from '@/components/shared/unit-img/UnitImg.vue';

export default defineComponent({
	components: { VButton, UnitImg },

	props: {
		unit: {
			type: Object,
			required: true,
		},
	},

	emits: ['edit', 'refresh', 'delete'],

	setup() {
		const isMenuOpened = ref(false);
		const actionBtn = useTemplateRef('actionBtn');
		const actionMenu = useTemplateRef('actionMenu');

		const toggleMenu = () => {
			isMenuOpened.value = !isMenuOpened.value;
		};

		const closeMenu = (e) => {
			const clickedOutside =
				actionBtn.value &&
				actionMenu.value &&
				!actionBtn.value.contains(e.target) &&
				!actionMenu.value.contains(e.target);

			if (clickedOutside) {
				isMenuOpened.value = false;
			}
		};

		onMounted(() => {
			document.addEventListener('click', closeMenu);
		});

		onBeforeMount(() => {
			document.removeEventListener('click', closeMenu);
		});

		return {
			formatHP,
			formatXP,
			formatCR,
			formatImg,

			isMenuOpened,

			toggleMenu,
		};
	},
});
