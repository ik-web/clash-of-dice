export const createUnit = unitData => {
    return {
        ...unitData,
        id: crypto.randomUUID(),
    };
};

export const updateUnit = (unitId, unitData, units) => {
    const unit = units.find(unit => unit.id === unitId);

    if (unit) {
        for (const key in unitData) {
            unit[key] = unitData[key];
        }
    }

    return units;
};

export const deleteUnit = (unitId, units) => {
    return units.filter(unit => unit.id !== unitId);
};
