import { defineComponent, ref, watchEffect } from 'vue';
import { storeToRefs } from 'pinia';
import { useMonsterStore } from '@/stores/monster';
import { useSettingsStore } from '@/stores/settings';
import { formatCR } from '@/utils/format-cr';
import challenges from '@/utils/challenges';
import PageLayout from '../../components/layout/PageLayout.vue';
import ConfirmModal from '../../components/confirm-modal/ConfirmModal.vue';

export default defineComponent({
	components: { PageLayout, ConfirmModal },

	setup() {
		const monsterStore = useMonsterStore();
		const settingsStore = useSettingsStore();
		const { settings } = storeToRefs(settingsStore);
		const { monsters, selectedMonsters } = storeToRefs(monsterStore);
		const { saveSettings, resetSettings } = settingsStore;
		const { fetchMonsters, selectMonster, resetSelectedMonsters, removeSelectedMonsters } =
			monsterStore;
		const loading = ref(false);
		const isConfirmModal = ref(false);

		const onSelectMonster = async () => {
			loading.value = true;
			await selectMonster(settings.value.monsterIndex);
			loading.value = false;
		};

		const onRemoveMonster = (id) => {
			removeSelectedMonsters(id);
		};

		const addRandomMonster = async () => {
			loading.value = true;
			const randomIndex = Math.floor(Math.random() * monsters.value.length);
			const randomMonsterIndex = monsters.value[randomIndex].index;
			await selectMonster(randomMonsterIndex);
			loading.value = false;
		};

		const onResetSettings = () => {
			isConfirmModal.value = true;
		};

		const onConfirmReset = () => {
			resetSettings();
			resetSelectedMonsters();
			isConfirmModal.value = false;
		};

		watchEffect(() => saveSettings());
		watchEffect(() => fetchMonsters(settings.value.cr));

		return {
			loading,
			settings,
			challenges,
			monsters,
			selectedMonsters,
			isConfirmModal,
			formatCR,
			onSelectMonster,
			onRemoveMonster,
			addRandomMonster,
			onResetSettings,
			onConfirmReset,
		};
	},
});
