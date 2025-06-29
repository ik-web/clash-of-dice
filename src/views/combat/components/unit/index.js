import { computed, defineComponent } from 'vue';
import { leveling } from '@/utils/leveling';
import { formatCR } from '@/utils/formatter';
import VButton from '@/components/ui/button/VButton.vue';

export default defineComponent({
    name: 'v-unit',
    components: { VButton },

    props: {
        unit: {
            type: Object,
            default: {},
        },
        active: {
            type: Boolean,
            default: false,
        },
    },

    emits: ['select'],

    setup(props) {
        const isOut = computed(() => props.unit.currentHP <= 0);
        const unitCR = computed(() => formatCR(props.unit.cr));
        const unitHP = computed(() => `${props.unit.currentHP}/${props.unit.hp}`);

        const unitImg = computed(() => {
            if (isOut.value) return '/clash-of-dice/img/skull.webp';

            return props.unit.class
                ? props.unit.image
                : `https://www.dnd5eapi.co${props.unit.image}`;
        });

        const isBloodied = computed(
            () =>
                props.active &&
                props.unit.currentHP > 0 &&
                props.unit.currentHP <= props.unit.hp / 2,
        );

        const unitExp = computed(() => {
            const expToLvl = props.unit.lvl ? leveling[props.unit.lvl] : 0;
            return `${props.unit.xp}/${expToLvl}`;
        });

        const unitHpCssClass = computed(() => {
            const cssClass = 'unit__hp';
            const cssBloodiedMode = 'unit__hp--bloodied';

            return isBloodied ? `${cssClass} ${cssBloodiedMode}` : cssClass;
        });

        return {
            isOut,
            unitHP,
            unitCR,
            unitImg,
            unitExp,
            isBloodied,
            unitHpCssClass,
        };
    },
});
