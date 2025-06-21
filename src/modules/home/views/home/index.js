import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import PageLayout from '@/components/layout/PageLayout.vue';

export default defineComponent({
    components: { PageLayout },

    setup() {
        const options = [
            {
                href: '/battleground',
                name: 'Battleground',
            },
            {
                href: '/characters',
                name: 'Characters',
            },
            {
                href: '/monsters',
                name: 'Monsters',
            },
            {
                href: '/scoring',
                name: 'Scoring',
            },
            // {
            //     href: '/settings',
            //     name: 'Settings',
            // },
        ];

        const router = useRouter();
        const redirectTo = path => router.push(path);

        return {
            options,
            redirectTo,
        };
    },
});
