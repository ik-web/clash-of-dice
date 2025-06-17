import { defineComponent, ref } from 'vue';
import logoHref from '../../assets/img/d20.png';

export default defineComponent({
	setup() {
		const pages = [
			{
				path: '/',
				name: 'Home',
			},
			{
				path: '/characters',
				name: 'Characters',
			},
			{
				path: '/battleground',
				name: 'Battleground',
			},
			{
				path: '/score',
				name: 'Score',
			},
			{
				path: '/settings',
				name: 'Settings',
			},
		];

		const isNavigation = ref(false);

		const toggleNav = () => {
			isNavigation.value = !isNavigation.value;
		};

		return {
			pages,
			logoHref,
			isNavigation,
			toggleNav,
		};
	},
});
