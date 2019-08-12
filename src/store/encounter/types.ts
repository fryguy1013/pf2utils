import { Action } from 'redux';

export interface XpBudget {
    [difficulty: string] : number;
};

export interface EncounterState {
    party_level: number;
    num_characters: number;
    enemies: [NpcInfo, number][];
    monster_sort_by: string;
    monster_sort_dir: string;
    monster_page_num: number;
}

export interface NpcInfo {
    name: string;
    cr: number;
    //size: string;
    type: string;
    //alignment: string;
    source: string;
}

export interface SetPartyLevel extends Action {
    type: 'setPartyLevel';
    level: number;
}

export interface SetNumCharacters extends Action {
    type: 'setNumCharacters';
    num_characters: number;
}

export interface AddNpc extends Action {
    type: 'addNpc';
    npc: NpcInfo;
}

export interface RemoveNpc extends Action {
    type: 'removeNpc';
    npc: NpcInfo;
}

export interface ChangeMonsterSort extends Action {
    type: 'changeMonsterSort';
    kind: string;
    direction: string;
}

export interface ChangeMonsterPage extends Action {
    type: 'changeMonsterPage';
    page_num: number;
}

export type EncounterAction =
    | SetPartyLevel
    | SetNumCharacters
    | AddNpc
    | RemoveNpc
    | ChangeMonsterSort
    | ChangeMonsterPage;