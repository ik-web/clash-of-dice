import { leveling } from './leveling';

export const formatHP = (hp, currentHP) => {
    return `${String(currentHP)}/${hp}`;
};

export const formatXP = (xp, lvl) => {
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
