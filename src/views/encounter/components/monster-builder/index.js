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
        const monsterCR = ref('all');
        const searchQuery = ref('');
        const monstersData = ref([]);
        const selectedMonsters = ref([]);

        const challengeOptions = [{ label: 'All', value: 'all' }, ...challenges];

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

        const getStat = stat => {
            return {
                count: stat,
                mod: Math.floor((stat - 10) / 2),
            };
        };

        const getActions = data => {
            const actions = (data || []).map(action => {
                const name = action.name;
                const desc = action.desc;

                let hit_bonus = null;
                let damage = null;

                if (action.attack_bonus !== undefined) {
                    hit_bonus = action.attack_bonus;
                }

                if (Array.isArray(action.damage) && action.damage.length > 0) {
                    const first = action.damage[0];
                    damage = first.damage_dice || null;
                }

                return { name, desc, hit_bonus, damage };
            });

            return actions;
        };

        const getSpellDesc = async spell => {
            if (!spell.url) return null;

            try {
                const res = await fetch(`https://www.dnd5eapi.co${spell.url}`);
                const data = await res.json();
                console.log(data.desc?.join('\n') || null);

                return data.desc?.join('\n') || null;
            } catch (error) {
                console.error(`Failed to fetch ${spell.name}:`, error);
                return null;
            }
        };

        const getSpells = async data => {
            const spellcastingAbility = (data || []).find(ability =>
                ability.name.toLowerCase().includes('spellcasting'),
            );

            const spells = [];

            if (spellcastingAbility && spellcastingAbility.spellcasting) {
                for (const spell of spellcastingAbility.spellcasting.spells || []) {
                    const desc = await getSpellDesc(spell);

                    spells.push({
                        desc,
                        name: spell.name,
                        level: spell.level,
                    });
                }
            }

            return spells;
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

                stats: {
                    STR: getStat(response.strength),
                    DEX: getStat(response.dexterity),
                    CON: getStat(response.constitution),
                    INT: getStat(response.intelligence),
                    WIS: getStat(response.wisdom),
                    CHA: getStat(response.charisma),
                },

                actions: getActions(response.actions),
                spells: await getSpells(response.special_abilities),
                data: response,
            };

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
