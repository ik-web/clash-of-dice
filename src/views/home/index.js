import { defineComponent } from 'vue';
import PageLayout from '../../components/layout/PageLayout.vue';

export default defineComponent({
    components: { PageLayout },

    setup() {
        const options = [
            {
                href: '/characters',
                name: 'Characters',
            },
            {
                href: '/battleground',
                name: 'Battleground',
            },
            {
                href: '/score',
                name: 'Score',
            },
            {
                href: '/settings',
                name: 'Settings',
            },
        ];

        return {
            options,
        };
    },
});
