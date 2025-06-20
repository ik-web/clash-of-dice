import { defineComponent } from 'vue';
import { storeToRefs } from 'pinia';
import { useScoreStore } from '@/stores/score';
import PageLayout from '../../components/layout/PageLayout.vue';

export default defineComponent({
    components: { PageLayout },

    setup() {
        const scoreStore = useScoreStore();
        const { score } = storeToRefs(scoreStore);

        return { score };
    },
});
