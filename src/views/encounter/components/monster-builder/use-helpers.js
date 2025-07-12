export const useMonsterBuilderHelpers = () => {
    const getSpeed = data => {
        let speed = '';

        if (data) {
            for (const key in data) {
                const label = `${key[0].toLocaleUpperCase()}${key.slice(1)}`;
                speed += `${label} ${data[key]} `;
            }
        }

        return speed.trim() || null;
    };

    const getStat = stat => {
        return {
            count: stat,
            mod: Math.floor((stat - 10) / 2),
        };
    };

    const getStats = data => {
        if (!data) return null;

        return {
            STR: getStat(data.strength),
            DEX: getStat(data.dexterity),
            CON: getStat(data.constitution),
            INT: getStat(data.intelligence),
            WIS: getStat(data.wisdom),
            CHA: getStat(data.charisma),
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

    const getSkillsFromProficiencies = proficiencies => {
        const skills = [];

        if (Array.isArray(proficiencies)) {
            for (const item of proficiencies) {
                const prof = item.proficiency;

                if (prof && prof.index?.startsWith('skill-')) {
                    skills.push({
                        name: prof.name.replace('Skill: ', ''),
                        value: item.value,
                    });
                }
            }
        }

        return skills;
    };

    const getSavesFromProficiencies = proficiencies => {
        const saves = [];

        if (Array.isArray(proficiencies)) {
            for (const item of proficiencies) {
                const prof = item.proficiency;

                if (prof && prof.index?.startsWith('saving-throw-')) {
                    saves.push({
                        name: prof.name.replace('Saving Throw: ', ''),
                        value: item.value,
                    });
                }
            }
        }

        return saves;
    };

    const getSenses = data => {
        let senses = '';

        if (data) {
            for (const key in data) {
                if (key === 'passive_perception') continue;

                const label = `${key[0].toLocaleUpperCase()}${key.slice(1)}`;
                senses += `${label} ${data[key]} `;
            }
        }

        return senses.trim() || null;
    };

    return {
        getSpeed,
        getStats,
        getSenses,
        getSpells,
        getActions,
        getSavesFromProficiencies,
        getSkillsFromProficiencies,
    };
};
