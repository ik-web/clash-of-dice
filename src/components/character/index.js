import { defineComponent, ref } from 'vue';
import CharacterCard from './components/character-card/CharacterCard.vue';
import CharacterForm from './components/character-form/CharacterForm.vue';

export default defineComponent({
    components: {
        CharacterCard,
        CharacterForm,
    },

    props: {
        character: {
            type: Object,
            required: true,
        },
    },

    setup() {
        const editMode = ref(false);
        return { editMode };
    },
});
