import HomeView from '../views/home/HomeView.vue';
import CharacterView from '@/views/character/CharacterView.vue';
import BattlegroundView from '@/views/battleground/BattlegroundView.vue';
import ScoreView from '@/views/score/ScoreView.vue';
import SettingsView from '@/views/settings/SettingsView.vue';

export const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
    },
    {
        path: '/characters',
        name: 'characters',
        component: CharacterView,
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
    {
        path: '/settings',
        name: 'settings',
        component: SettingsView,
    },
];
