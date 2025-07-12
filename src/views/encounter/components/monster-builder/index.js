import { computed, defineComponent, ref, watchEffect } from 'vue';
import { createUnit } from '@/utils/units';
import { formatCR } from '@/utils/formatter';
import { dndApiService } from '@/services/dnd-api';
import challenges from '@/utils/challenges';
import VDrawer from '@/components/ui/drawer/VDrawer.vue';
import VSelect from '@/components/ui/select/VSelect.vue';
import VButton from '@/components/ui/button/VButton.vue';
import { useMonsterBuilderHelpers } from './use-helpers';

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
        const monsterCR = ref('all');
        const searchQuery = ref('');
        const monstersData = ref([]);
        const selectedMonsters = ref([]);

        const challengeOptions = [{ label: 'All', value: 'all' }, ...challenges];
        const {
            getSpeed,
            getStats,
            getSenses,
            getSpells,
            getActions,
            getSavesFromProficiencies,
            getSkillsFromProficiencies,
        } = useMonsterBuilderHelpers();

        const monstersList = computed(() =>
            monstersData.value.filter(m =>
                m.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
            ),
        );

        const fetchMonsters = async () => {
            try {
                loading.value = true;
                let data;

                if (monsterCR.value === 'all') {
                    data = await dndApiService.getMonsterList();
                } else {
                    data = await dndApiService.getMonsterListByRating(monsterCR.value);
                }

                monstersData.value = data.results.map(m => ({ ...m, count: 0 }));
            } catch (error) {
                throw error;
            } finally {
                loading.value = false;
            }
        };

        const fetchMonsterByIndex = async index => {
            const response = await dndApiService.getMonsterByIndex(index);
            const monster = {
                xp: response.xp,
                name: response.name,
                type: response.type,
                size: response.size,
                image: response.image,
                speed: response.speed,
                alignment: response.alignment,
                CR: response.challenge_rating,
                languages: response.languages,
                proficiencyBonus: response.proficiency_bonus,
                damageImmunities: response.damage_immunities,
                damageResistances: response.damage_resistances,
                conditionImmunities: response.condition_immunities,
                damageVulnerabilities: response.damage_vulnerabilities,

                defaultAC: response.armor_class[0].value,
                currentAC: response.armor_class[0].value,

                tempHP: null,
                overrideHP: null,
                defaultHP: response.hit_points,
                currentHP: response.hit_points,

                initiative: null,

                stats: getStats(response),
                speed: getSpeed(response.speed),
                senses: getSenses(response.senses),
                actions: getActions(response.actions),
                spells: await getSpells(response.special_abilities),
                saves: getSavesFromProficiencies(response.proficiencies),
                skills: getSkillsFromProficiencies(response.proficiencies),
                passivePerception: response.senses.passive_perception || null,

                data: response,
            };

            return monster;
        };

        const addMonster = monster => {
            const existsMonster = selectedMonsters.value.find(m => m.index === monster.index);

            if (existsMonster) {
                existsMonster.count++;
            } else {
                selectedMonsters.value.unshift({ ...monster, count: 1 });
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

        watchEffect(() => fetchMonsters());

        return {
            loading,
            monsterCR,
            searchQuery,
            monstersList,
            challengeOptions,
            selectedMonsters,
            formatCR,
            addMonster,
            addMonsters,
            removeMonster,
        };
    },
});
