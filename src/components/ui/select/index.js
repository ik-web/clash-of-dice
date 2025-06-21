import { computed, defineComponent, onBeforeUnmount, ref, useTemplateRef, watch } from 'vue';
import VModal from '@/components/ui/modal/VModal.vue';

export default defineComponent({
    components: { VModal },

    props: {
        modelValue: {
            type: [String, Number],
            required: true,
        },
        options: {
            type: Array,
            required: true,
        },
        placeholder: {
            type: String,
            default: 'Select a value...',
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },

    emits: ['update:modelValue'],

    setup(props, { emit }) {
        const isOpen = ref(false);
        const selectInput = useTemplateRef('selectInput');

        const label = computed(() => {
            const activeOption = props.options.find(o => o.value === props.modelValue);

            if (!activeOption) return props.placeholder;

            return activeOption.label;
        });

        const checkActiveOption = option => {
            return option.value === props.modelValue;
        };

        const toggleMenu = () => {
            isOpen.value = !isOpen.value;
        };

        const onOptionClick = option => {
            emit('update:modelValue', option.value);
        };

        const closeMenu = ({ target }) => {
            if (target !== selectInput.value) isOpen.value = false;
        };

        watch(isOpen, open => {
            if (open) document.addEventListener('click', closeMenu);
        });

        onBeforeUnmount(() => {
            document.removeEventListener('click', closeMenu);
        });

        return {
            label,
            isOpen,
            toggleMenu,
            onOptionClick,
            checkActiveOption,
        };
    },
});
