export interface XpBudget {
    [difficulty: string] : number;
};

export interface EncounterState {
    party_level: number;
    num_characters: number;
    enemies: { npc: NpcInfo, count: number }[];
}

export interface NpcInfo {
    name: string;
    cr: number;
    size: string;
    type: string[];
    //alignment: string;
    sources: {
        [key: string]: string;
    }
}
