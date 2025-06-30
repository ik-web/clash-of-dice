import { computed, defineComponent, ref, watchEffect } from 'vue';
import { createUnit } from '@/utils/units';
import { formatCR } from '@/utils/formatter';
import { dndApiService } from '@/services/dnd-api';
import challenges from '@/utils/challenges';
import VDrawer from '@/components/ui/drawer/VDrawer.vue';
import VSelect from '@/components/ui/select/VSelect.vue';
import VButton from '@/components/ui/button/VButton.vue';

export default defineComponent({
    components: { VDrawer, VSelect, VButton },

    props: {
        open: {
            type: Boolean,
            default: false,
        },
    },

    emits: ['update:open', 'add'],

    setup(_props, { emit }) {
        const loading = ref(false);
        const monsterCR = ref('0');
        const searchQuery = ref('');
        const monstersData = ref([]);
        const selectedMonsters = ref([]);

        const monstersList = computed(() =>
            monstersData.value.filter(m =>
                m.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
            ),
        );

        const fetchMonstersByCR = async () => {
            try {
                loading.value = true;

                const { results } = await dndApiService.getMonsterListByRating(monsterCR.value);
                monstersData.value = results.map(m => ({ ...m, count: 0 }));
            } catch (error) {
                throw error;
            } finally {
                loading.value = false;
            }
        };

        const fetchMonsterByIndex = async index => {
            const response = await dndApiService.getMonsterByIndex(index);
            const monster = {
                data: response,
                xp: response.xp,
                initiative: null,
                name: response.name,
                type: response.type,
                image: response.image,
                hp: response.hit_points,
                cr: response.challenge_rating,
                currentHP: response.hit_points,
                ac: response.armor_class[0].value,
                spells: response.special_abilities[0]?.spellcasting?.spells || [],
            };

            // console.log(monster);

            return monster;
        };

        const addMonster = monster => {
            const existsMonster = selectedMonsters.value.find(m => m.index === monster.index);

            if (existsMonster) {
                existsMonster.count++;
            } else {
                selectedMonsters.value.push({ ...monster, count: 1 });
            }
        };

        const removeMonster = monster => {
            monster.count--;

            if (!monster.count) {
                selectedMonsters.value = selectedMonsters.value.filter(
                    m => m.index !== monster.index,
                );
            }
        };

        const addMonsters = async () => {
            try {
                loading.value = true;
                const monsters = [];

                for (let i = 0; i < selectedMonsters.value.length; i++) {
                    const monstr = selectedMonsters.value[i];

                    for (let k = 1; k <= monstr.count; k++) {
                        const response = await fetchMonsterByIndex(monstr.index);
                        const monster = createUnit(response);
                        monsters.push(monster);
                    }
                }

                emit('add', monsters);
                emit('update:open', false);
                selectedMonsters.value = [];
            } catch (error) {
                throw error;
            } finally {
                loading.value = false;
            }
        };

        watchEffect(() => fetchMonstersByCR());

        return {
            loading,
            monsterCR,
            challenges,
            searchQuery,
            monstersList,
            selectedMonsters,
            formatCR,
            addMonster,
            addMonsters,
            removeMonster,
        };
    },
});
