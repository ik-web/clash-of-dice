import { leveling } from './leveling';

export const formatHP = unit => {
    const defaultHP = +unit.defaultHP;
    const currentHP = +unit.currentHP;
    const overrideHP = +unit.overrideHP;
    const totalHP = overrideHP || defaultHP;

    return `${String(currentHP)}/${totalHP}`;
};

export const formatEXP = (xp, lvl) => {
    if (!lvl) return String(xp);
    return `${xp}/${leveling[lvl]}`;
};

export const formatImg = img => {
    return img.startsWith('/api') ? `https://www.dnd5eapi.co${img}` : img;
};

export const formatCR = cr => {
    switch (cr) {
        case 0.125:
            return '1/8';
        case 0.25:
            return '1/4';
        case 0.5:
            return '1/2';
        default:
            return String(cr);
    }
};
