import { defineComponent, nextTick, ref, toRef, useTemplateRef, watch } from 'vue';
import VModal from '@/components/ui/modal/VModal.vue';
import VButton from '@/components/ui/button/VButton.vue';

export default defineComponent({
    components: { VModal, VButton },

    props: {
        open: {
            type: Boolean,
            default: false,
        },
        unitName: {
            type: String,
            required: true,
        },
    },

    emits: ['update:open', 'set'],

    setup(props, { emit }) {
        const input = ref('');
        const open = toRef(props, 'open');
        const inputRef = useTemplateRef('hpInput');

        const onClick = type => {
            emit('set', { type, value: +input.value });
            emit('update:open', false);
            input.value = '';
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
