import HomeView from '../modules/home/views/home/HomeView.vue';
import ScoreView from '@/modules/scoring/views/score/ScoreView.vue';
import MonstersView from '@/modules/monsters/views/monsters/MonstersView.vue';
import SettingsView from '@/modules/settings/views/settings/SettingsView.vue';
import CharactersView from '@/modules/characters/views/characters/CharactersView.vue';
import BattlegroundView from '@/modules/battleground/views/battleground/BattlegroundView.vue';

export const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
    },
    {
        path: '/battleground',
        name: 'battleground',
        component: BattlegroundView,
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
        path: '/scoring',
        name: 'scoring',
        component: ScoreView,
    },
    {
        path: '/settings',
        name: 'settings',
        component: SettingsView,
    },
];
