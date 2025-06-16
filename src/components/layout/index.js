import { defineComponent } from 'vue';
import logoHref from '../../assets/img/d20.png';

export default defineComponent({
    setup() {
        const pages = [
            {
                path: '/',
                name: 'Home',
            },
            {
                path: '/characters',
                name: 'Characters',
            },
            {
                path: '/battleground',
                name: 'Battleground',
            },
            {
                path: '/score',
                name: 'Score',
            },
            {
                path: '/settings',
                name: 'Settings',
            },
        ];

        return {
            logoHref,
            pages,
        };
    },
});
