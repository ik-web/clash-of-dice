import HomeView from '../views/home/HomeView.vue';
import CharactersView from '@/views/characters/CharactersView.vue';
import BattlegroundView from '@/views/battleground/BattlegroundView.vue';
import ScoreView from '@/views/score/ScoreView.vue';
import MonstersView from '@/views/monsters/MonstersView.vue';

export const routes = [
	{
		path: '/',
		name: 'home',
		component: HomeView,
	},
	{
		path: '/characters',
		name: 'characters',
		component: CharactersView,
	},
	{
		path: '/monsters',
		name: 'monsters',
		component: MonstersView,
	},
	{
		path: '/battleground',
		name: 'battleground',
		component: BattlegroundView,
	},
	{
		path: '/score',
		name: 'score',
		component: ScoreView,
	},
];
