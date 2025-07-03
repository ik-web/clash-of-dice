import { defineComponent, onBeforeMount, onMounted, ref, useTemplateRef } from 'vue';
import VButton from '@/components/ui/button/VButton.vue';
import UnitImg from '@/components/shared/unit-img/UnitImg.vue';

export default defineComponent({
    components: { VButton, UnitImg },

    setup() {
        const isOpened = ref(false);
        const menuBtn = useTemplateRef('menuBtn');
        const menuPopup = useTemplateRef('menuPopup');

        const toggleMenu = () => {
            isOpened.value = !isOpened.value;
        };

        const closeMenu = e => {
            const clickedOutside =
                menuBtn.value &&
                menuPopup.value &&
                !menuBtn.value.contains(e.target) &&
                !menuPopup.value.contains(e.target);

            const clickedButton = e.target.nodeName === 'BUTTON';

            if (clickedOutside || clickedButton) {
                isOpened.value = false;
            }
        };

        onMounted(() => {
            document.addEventListener('click', closeMenu);
        });

        onBeforeMount(() => {
            document.removeEventListener('click', closeMenu);
        });

        return { isOpened, toggleMenu };
    },
});
