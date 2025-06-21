import { defineComponent, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useSettingsStore } from '@/stores/settings';
import { useCharacterStore } from '@/stores/character';
import PageLayout from '../../components/layout/PageLayout.vue';
import VCharacter from '@/components/character/VCharacter.vue';

export default defineComponent({
    components: { PageLayout, VCharacter },

    setup() {
        const settingsStore = useSettingsStore();
        const characterStore = useCharacterStore();
        const { subPages } = settingsStore;
        const { characters } = storeToRefs(characterStore);

        return { characters, subPages };
    },
});
