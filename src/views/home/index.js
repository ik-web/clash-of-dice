import { defineComponent } from 'vue';
import PageLayout from '../../components/layout/PageLayout.vue';

export default defineComponent({
    components: { PageLayout },

    setup() {
        const options = [
            {
                href: '/battleground',
                name: 'Battleground',
            },
            {
                href: '/settings/characters',
                name: 'Characters',
            },
            {
                href: '/settings/monsters',
                name: 'Monsters',
            },
            {
                href: '/scoring',
                name: 'Scoring',
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
