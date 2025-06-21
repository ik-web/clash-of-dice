import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
import logoHref from '@/assets/img/d20.png';

export default defineComponent({
    props: {
        subNavigation: {
            type: Array,
            default: () => [],
        },
    },

    setup() {
        const pages = [
            {
                path: '/',
                name: 'Home',
            },
            {
                path: '/battleground',
                name: 'Battleground',
            },
            {
                path: '/characters',
                name: 'Characters',
            },
            {
                path: '/monsters',
                name: 'Monsters',
            },
            {
                path: '/scoring',
                name: 'Scoring',
            },
            // {
            //     path: '/settings',
            //     name: 'Settings',
            // },
        ];

        const route = useRoute();
        const isNavigation = ref(false);

        const checkParentRoute = childrenRoutePath => {
            const parentRoutePart = route.path.split('/')[1];
            const childRoutePart = childrenRoutePath.split('/')[1];

            return parentRoutePart === childRoutePart;
        };

        const toggleNav = () => {
            isNavigation.value = !isNavigation.value;
        };

        return {
            pages,
            logoHref,
            isNavigation,
            toggleNav,
            checkParentRoute,
        };
    },
});
