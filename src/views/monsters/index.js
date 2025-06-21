import { computed, defineComponent, ref, watchEffect } from 'vue';
import { storeToRefs } from 'pinia';
import { useMonsterStore } from '@/stores/monster';
import { useSettingsStore } from '@/stores/settings';
import { formatCR } from '@/utils/format-cr';
import challenges from '@/utils/challenges';
import PageLayout from '@/components/layout/PageLayout.vue';
import ConfirmModal from '@/components/confirm-modal/ConfirmModal.vue';
import VButton from '@/components/button/VButton.vue';

export default defineComponent({
    components: { PageLayout, ConfirmModal, VButton },

    setup() {
        const monsterStore = useMonsterStore();
        const settingsStore = useSettingsStore();
        const { settings } = storeToRefs(settingsStore);
        const { monsters, selectedMonsters } = storeToRefs(monsterStore);
        const { subPages, saveSettings, resetSettings } = settingsStore;

        const {
            fetchMonsters,
            selectMonster,
            selectRandomMonster,
            resetSelectedMonsters,
            removeSelectedMonsters,
        } = monsterStore;

        const loading = ref(false);
        const isConfirmModal = ref(false);

        const formTitle = computed(() => {
            return settings.value.mode === 'infinity' ? 'Infinity battle' : 'Add monsters';
        });

        const addMonsterDisabled = computed(() => {
            const isDisabled = settings.value.mode === 'selected' && !settings.value.monsterIndex;
            return loading && isDisabled;
        });

        const onAddMonster = async () => {
            loading.value = true;

            if (settings.value.mode === 'selected') {
                await selectMonster(settings.value.monsterIndex);
            }

            if (settings.value.mode === 'random') {
                selectRandomMonster();
            }

            loading.value = false;
        };

        const onResetMonsters = () => {
            isConfirmModal.value = true;
        };

        const onConfirmReset = () => {
            resetSettings();
            resetSelectedMonsters();
            isConfirmModal.value = false;
        };

        const onRemoveMonster = id => {
            removeSelectedMonsters(id);
        };

        watchEffect(() => saveSettings());
        watchEffect(() => fetchMonsters(settings.value.cr));

        return {
            loading,
            settings,
            monsters,
            subPages,
            formTitle,
            challenges,
            isConfirmModal,
            selectedMonsters,
            addMonsterDisabled,
            formatCR,
            onAddMonster,
            onConfirmReset,
            onRemoveMonster,
            onResetMonsters,
        };
    },
});
