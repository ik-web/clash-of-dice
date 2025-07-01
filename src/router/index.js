import { createRouter, createWebHashHistory } from 'vue-router';
import { routes } from './routes';
import { useEncounterStore } from '@/store/encounter';
import { storeToRefs } from 'pinia';

const router = createRouter({
    routes,
    history: createWebHashHistory(import.meta.env.BASE_URL),
});

router.beforeEach((to, from, next) => {
    const encounterStore = useEncounterStore();
    const { encounters } = storeToRefs(encounterStore);

    if (to.name === 'encounters' && !encounters.value.length) {
        router.push({ name: 'encounters-encounter' });
    }

    next();
});

export default router;
