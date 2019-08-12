import * as types from './types';

export const setPartyLevel = (level: number): types.SetPartyLevel => ({
    type: 'setPartyLevel',
    level: level,
});

export const setNumCharacters = (num_characters: number): types.SetNumCharacters => ({
    type: 'setNumCharacters',
    num_characters: num_characters,
});

export const addNpc = (npc: types.NpcInfo): types.AddNpc => ({
    type: 'addNpc',
    npc: npc
});

export const removeNpc = (npc: types.NpcInfo): types.RemoveNpc => ({
    type: 'removeNpc',
    npc: npc
});

export const changeMonsterSort = (kind: string, direction: string): types.ChangeMonsterSort => ({
    type: 'changeMonsterSort',
    kind: kind,
    direction: direction,
});

export const changeMonsterPage = (page_num: number): types.ChangeMonsterPage => ({
    type: 'changeMonsterPage',
    page_num: page_num,
});
