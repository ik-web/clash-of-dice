import HomeView from '../views/home/HomeView.vue';
import ScoreView from '@/views/score/ScoreView.vue';
import MonstersView from '@/views/monsters/MonstersView.vue';
import SettingsView from '@/views/settings/SettingsView.vue';
import CharactersView from '@/views/characters/CharactersView.vue';
import BattlegroundView from '@/views/battleground/BattlegroundView.vue';

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
        path: '/scoring',
        name: 'scoring',
        component: ScoreView,
    },
    {
        path: '/settings',
        name: 'settings',
        component: SettingsView,
    },
    {
        path: '/settings/characters',
        name: 'settings-characters',
        component: CharactersView,
    },
    {
        path: '/settings/monsters',
        name: 'settings-monsters',
        component: MonstersView,
    },
];
