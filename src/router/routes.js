import { subNavigation } from './sub-navigation';
import HomeView from '@/views/home/HomeView.vue';
import ScoreView from '@/views/score/ScoreView.vue';
import CombatView from '@/views/combat/CombatView.vue';
import PartiesView from '@/views/parties/PartiesView.vue';
import BestiaryView from '@/views/bestiary/BestiaryView.vue';
import SettingsView from '@/views/settings/SettingsView.vue';
import EncountersView from '@/views/encounters/EncountersView.vue';
import EncounterView from '@/views/encounter/EncounterView.vue';

export const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
        meta: {
            navLabel: 'Home',
        },
    },
    {
        path: '/encounters',
        name: 'encounters',
        component: EncountersView,
        meta: {
            navLabel: 'Encounters',
            subNavigation: subNavigation.encounters,
        },
    },
    {
        path: '/encounters/encounter/:id',
        name: 'encounters-encounter',
        component: EncounterView,
        meta: {
            subNavigation: subNavigation.encounters,
        },
    },
    {
        path: '/encounters/combat/:id',
        name: 'encounters-combat',
        component: CombatView,
    },
    // {
    //     path: '/parties',
    //     name: 'parties',
    //     component: PartiesView,
    //     meta: {
    //         navLabel: 'Parties',
    //     },
    // },
    // {
    //     path: '/bestiary',
    //     name: 'bestiary',
    //     component: BestiaryView,
    //     meta: {
    //         navLabel: 'Bestiary',
    //     },
    // },
    // {
    //     path: '/score',
    //     name: 'score',
    //     component: ScoreView,
    //     meta: {
    //         navLabel: 'Score',
    //     },
    // },
    {
        path: '/settings',
        name: 'settings',
        component: SettingsView,
        meta: {
            navLabel: 'Settings',
        },
    },
];
