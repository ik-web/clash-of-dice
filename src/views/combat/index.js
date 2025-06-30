import { defineComponent, nextTick, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useEncounterStore } from '@/store/encounter';
import PageLayout from '@/components/layout/PageLayout.vue';
import CombatCard from './components/combat-card/CombatCard.vue';

export default defineComponent({
	components: { PageLayout, CombatCard },

	setup() {
		const route = useRoute();
		const router = useRouter();
		const encounterStore = useEncounterStore();
		const { getEncounter } = encounterStore;

		const encounter = getEncounter(route.params.id);

		if (!encounter) router.push('/404');

		const units = ref(encounter.units);

		return { units };
	},
});
