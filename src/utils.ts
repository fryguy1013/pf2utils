import { EncounterState, XpBudget } from './types'

interface DifficultyInfo {
    difficulty_name: string;
    total_xp: number;
    actual_xp: number;
}

export const encounter_difficulties = ['Trivial', 'Low', 'Moderate', 'Severe', 'Extreme'];

export function calcXpBudget(num_players: number): XpBudget {
    const xp_ratio = num_players / 4;
    return {
        Trivial: 40 * xp_ratio,
        Low: 60 * xp_ratio,
        Moderate: 80 * xp_ratio,
        Severe: 120 * xp_ratio,
        Extreme: 160 * xp_ratio,
    };
}

function difficultyNameForXp(num_players: number, xp: number): string {
    const xp_ratio = num_players / 4;

    if (xp === 0) return '';
    if (xp < 50 * xp_ratio) return 'Trivial';
    if (xp < 70 * xp_ratio) return 'Low';
    if (xp < 100 * xp_ratio) return 'Moderate';
    if (xp < 140 * xp_ratio) return 'Severe';
    return 'Extreme';
}

function xpDifficultyForEnemy(party_level: number, enemy_level: number): number {
    if (enemy_level <= party_level - 4) return 10;
    if (enemy_level === party_level - 3) return 15;
    if (enemy_level === party_level - 2) return 20;
    if (enemy_level === party_level - 1) return 30;
    if (enemy_level === party_level) return 40;
    if (enemy_level === party_level + 1) return 60;
    if (enemy_level === party_level + 2) return 80;
    if (enemy_level === party_level + 3) return 120;
    return 160;
}

export function calcDifficulty(encounter: EncounterState): DifficultyInfo {

    const xp_ratio = encounter.num_characters / 4;
    const xp = encounter.enemies
        .flatMap(({ npc, count }) => Array(count).fill(npc.cr))
        .map(l => xpDifficultyForEnemy(encounter.party_level, l))
        .reduce((sum, current) => sum + current, 0);
    return {
        difficulty_name: difficultyNameForXp(encounter.num_characters, xp),
        total_xp: Math.round(xp),
        actual_xp: Math.round(xp / xp_ratio),
    };
}