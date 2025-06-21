import { defineComponent, nextTick, ref, toRef, useTemplateRef, watch } from 'vue';
import VModal from '@/components/modal/VModal.vue';
import VButton from '@/components/button/VButton.vue';

export default defineComponent({
    components: { VModal, VButton },

    props: {
        open: {
            type: Boolean,
            default: false,
        },
    },

    emits: ['click'],

    setup(props, { emit }) {
        const input = ref(null);
        const open = toRef(props, 'open');
        const inputRef = useTemplateRef('initiativeInput');

        const onClick = () => {
            emit('click', input.value);
            input.value = null;
        };

        const setInputFocus = async value => {
            if (value) {
                await nextTick();
                inputRef.value?.focus();
            }
        };

        watch(open, setInputFocus);

        return { input, onClick };
    },
});
