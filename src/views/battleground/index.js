import { defineComponent, onMounted, ref, watchEffect } from 'vue';
import { dndApiService } from '../../services/dnd-api';
import PageLayout from '../../components/layout/PageLayout.vue';
import VCreature from '../../components/monster/VCreature.vue';

export default defineComponent({
    components: { PageLayout, VCreature },

    setup() {
        const monsters = ref([]);
        const loading = ref(false);
        const creatures = ref([]);
        const currentMonster = ref(null);
        const currentMonsterIndex = ref(0);

        const getMonsters = async () => {
            const response = await dndApiService.getMonsterListByRating(0.125);
            monsters.value = response.results;
            console.log(monsters.value[0]);
        };

        const getCurrentMonster = async () => {
            loading.value = true;
            const monsterIndex = monsters.value[currentMonsterIndex.value].index;
            currentMonster.value = await dndApiService.getMonsterByIndex(monsterIndex);
            creatures.value = [currentMonster.value];
            loading.value = false;
        };

        watchEffect(() => {
            if (monsters.value.length) {
                getCurrentMonster();
            }
        });

        onMounted(() => {
            getMonsters();
        });

        return {
            loading,
            creatures,
            currentMonster,
            currentMonsterIndex,
        };
    },
});
