import { computed, defineComponent } from 'vue';
import { formatCR, formatEXP } from '@/utils/formatter';
import VDrawer from '@/components/ui/drawer/VDrawer.vue';

export default defineComponent({
    components: { VDrawer },

    props: {
        open: {
            type: Boolean,
            default: false,
        },
        unit: {
            type: Object,
            required: true,
        },
    },

    setup(props) {
        const isDamageImmunities = computed(
            () => props.unit.damageImmunities && props.unit.damageImmunities.length,
        );

        const isDamageResistances = computed(
            () => props.unit.damageResistances && props.unit.damageResistances.length,
        );

        const isConditionImmunities = computed(
            () => props.unit.conditionImmunities && props.unit.conditionImmunities.length,
        );

        const isDamageVulnerabilities = computed(
            () => props.unit.damageVulnerabilities && props.unit.damageVulnerabilities.length,
        );

        const isDefence = computed(
            () =>
                isDamageImmunities.value ||
                isDamageResistances.value ||
                isConditionImmunities.value ||
                isDamageVulnerabilities.value,
        );

        return {
            formatCR,
            formatEXP,
            isDefence,
            isDamageImmunities,
            isDamageResistances,
            isConditionImmunities,
            isDamageVulnerabilities,
        };
    },
});
