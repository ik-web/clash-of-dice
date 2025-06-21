import {
    computed,
    defineComponent,
    nextTick,
    onBeforeUnmount,
    ref,
    useTemplateRef,
    watch,
} from 'vue';
import VModal from '@/components/modal/VModal.vue';

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
            default: '',
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },

    emits: ['update:modelValue'],

    setup(props, { emit }) {
        const isOpen = ref(false);
        const button = useTemplateRef('selectButton');

        const label = computed(() => {
            const activeOption = props.options.find(o => (o.value || o) === props.modelValue);
            return activeOption || props.placeholder;
        });

        const checkActiveOption = option => {
            return option.value ? option.value === props.modelValue : option === props.modelValue;
        };

        const toggleMenu = () => {
            isOpen.value = !isOpen.value;
        };

        const onOptionClick = option => {
            const value = option.value || option;
            emit('update:modelValue', value);
        };

        const closeMenu = ({ target }) => {
            if (target !== button.value) isOpen.value = false;
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
