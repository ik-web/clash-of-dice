import { defineComponent, onMounted, ref } from 'vue';
import { dndApiService } from '../services/dnd-api';

export default defineComponent({
    setup() {
        const monsters = ref([]);
        const loading = ref(false);
        const selectedMonster = ref(null);

        const getMonster = async () => {
            const response = await dndApiService.getMonsterList();
            monsters.value = response.results;
        };

        const getMonsters = async () => {
            const response = await dndApiService.getMonsterList();
            monsters.value = response.results;
        };

        const onMonsterBtnClick = async index => {
            loading.value = true;
            selectedMonster.value = null;
            selectedMonster.value = await dndApiService.getMonsterByIndex(index);
            console.log(selectedMonster.value);
        };

        const onImageLoad = () => {
            loading.value = false;
        };

        onMounted(() => {
            getMonsters();
        });

        return { monsters, selectedMonster, loading, onMonsterBtnClick, onImageLoad };
    },
});
