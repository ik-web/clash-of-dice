import { computed, defineComponent, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import logoHref from '@/assets/img/d20.png';

export default defineComponent({
    setup() {
        const route = useRoute();
        const router = useRouter();
        const isMenu = ref(false);

        const navigation = computed(() => {
            const routes = router.getRoutes();

            return routes
                .filter(route => route.meta.navLabel)
                .map(route => ({
                    path: route.path,
                    name: route.name,
                    label: route.meta.navLabel,
                    title: route.meta.navLabel,
                }));
        });

        const currentPage = computed(() => route.name || null);
        const subNavigation = computed(() => route.meta.subNavigation || null);

        const checkActiveLink = linkName => {
            return currentPage.value.startsWith(linkName.split('-')[0]);
        };

        const toggleMenu = () => {
            isMenu.value = !isMenu.value;
        };

        return {
            isMenu,
            logoHref,
            navigation,
            currentPage,
            subNavigation,
            toggleMenu,
            checkActiveLink,
        };
    },
});
