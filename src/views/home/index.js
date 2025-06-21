import { defineComponent } from 'vue';
import PageLayout from '@/components/layout/PageLayout.vue';

export default defineComponent({
    components: { PageLayout },

    setup() {
        const options = [
            {
                key: 1,
                href: '/encounters',
                label: 'Encaunters',
            },
            {
                key: 2,
                href: '/parties',
                label: 'Parties',
            },
            {
                key: 3,
                href: '/bestiary',
                label: 'Bestiary',
            },
            {
                key: 4,
                href: '/score',
                label: 'Score',
            },
        ];

        return { options };
    },
});
