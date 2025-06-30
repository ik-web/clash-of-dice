import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { createUnit, deleteUnit, updateUnit } from '@/utils/units';
import { useEncounterStore } from '@/store/encounter';
import VButton from '@/components/ui/button/VButton.vue';
import PageLayout from '@/components/layout/PageLayout.vue';
import CharBuilder from './components/char-builder/CharBuilder.vue';
import EncounterUnit from './components/encounter-unit/EncounterUnit.vue';
import MonsterBuilder from '@/views/encounter-builder/components/monster-builder/MonsterBuilder.vue';

export default defineComponent({
	components: {
		VButton,
		PageLayout,
		CharBuilder,
		EncounterUnit,
		MonsterBuilder,
	},

	setup() {
		const router = useRouter();
		const encounterStore = useEncounterStore();
		const { createEncounter } = encounterStore;

		const isCharBuilder = ref(false);
		const isPartyBuilder = ref(false);
		const isMonsterBuilder = ref(false);

		const units = ref([]);
		const charForEdit = ref({});
		const encounterName = ref('');

		const openCharBuilder = () => {
			isCharBuilder.value = true;
		};

		const openMonsterBuilder = () => {
			isMonsterBuilder.value = true;
		};

		const openPartyBuilder = () => {
			isPartyBuilder.value = true;
		};

		const onAddChars = (chars) => {
			units.value.push(...chars);
		};

		const onAddMonsters = (monsters) => {
			units.value.push(...monsters);
		};

		const onEditUnit = (unit) => {};

		const onRefreshUnit = (unit) => {
			const dataForUpdate = {
				initiative: null,
				currentHP: unit.hp,
			};

			units.value = updateUnit(unit.id, dataForUpdate, units.value);
		};

		const onDeleteUnit = (id) => {
			units.value = deleteUnit(id, units.value);
		};

		const saveEncounter = () => {
			const newEncounter = {
				name: encounterName.value,
				units: units.value,
			};

			createEncounter(newEncounter);
			router.push('/encounters');
		};

		return {
			units,
			isCharBuilder,
			charForEdit,
			isMonsterBuilder,

			encounterName,
			saveEncounter,

			openCharBuilder,
			openPartyBuilder,
			openMonsterBuilder,

			onAddChars,
			onAddMonsters,

			onEditUnit,
			onDeleteUnit,
			onRefreshUnit,
		};
	},
});
