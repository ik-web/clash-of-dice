import { defineComponent, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useCharacterStore } from '@/modules/characters/store';
import PageLayout from '@/components/layout/PageLayout.vue';
import CharacterCard from '../../components/character-card/CharacterCard.vue';

export default defineComponent({
    components: { PageLayout, CharacterCard },

    setup() {
        const characterStore = useCharacterStore();
        const { characters } = storeToRefs(characterStore);

        return { characters };
    },
});
