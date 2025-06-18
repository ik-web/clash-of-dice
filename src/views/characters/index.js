import { defineComponent, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useCharacterStore } from '@/stores/character';
import PageLayout from '../../components/layout/PageLayout.vue';
import VCharacter from '@/components/character/VCharacter.vue';

export default defineComponent({
    components: { PageLayout, VCharacter },

    setup() {
        const characterStore = useCharacterStore();
        const { characters } = storeToRefs(characterStore);

        return { characters };
    },
});
