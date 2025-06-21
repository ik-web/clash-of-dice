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
                href: '/characters',
                name: 'Characters',
            },
            {
                href: '/monsters',
                name: 'Monsters',
            },
            {
                href: '/score',
                name: 'Score',
            },
        ];

        return {
            options,
        };
    },
});
