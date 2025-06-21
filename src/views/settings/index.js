import { defineComponent } from 'vue';
import { storeToRefs } from 'pinia';
import { useSettingsStore } from '@/stores/settings';
import PageLayout from '../../components/layout/PageLayout.vue';

export default defineComponent({
    components: { PageLayout },

    setup() {
        const settingsStore = useSettingsStore();
        const { subPages } = settingsStore;

        return { subPages };
    },
});
