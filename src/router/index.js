import { createRouter, createWebHashHistory } from 'vue-router';
import { routes } from './routes';

const router = createRouter({
	routes,
	history: createWebHashHistory(import.meta.env.BASE_URL),
});

export default router;
