// import produce from 'immer';
// import { EncounterState, EncounterAction } from './types';

// const initialState: EncounterState = {
//     num_characters: 4,
//     party_level: 1,
//     enemies: [],
//     monster_sort_by: 'name',
//     monster_sort_dir: 'asc',
//     monster_page_num: 1,
// };

// export function encounterReducer(
//     state = initialState,
//     action: EncounterAction
// ): EncounterState {
//     switch (action.type) {
//         case "setPartyLevel":
//             return produce(state, draft => {
//                 draft.party_level = action.level;
//              });
//         case "setNumCharacters":
//             return produce(state, draft => {
//                 draft.num_characters = action.num_characters;
//             });
//         case "addNpc":
//             return produce(state, draft => {
//                 const index = draft.enemies.findIndex(([npc, count]) => npc.name === action.npc.name);
//                 if (index === -1)
//                     draft.enemies.push([action.npc, 1]);
//                 else
//                     draft.enemies[index][1]++;
//             });
//         case "removeNpc":
//             return produce(state, draft => {
//                 const index = draft.enemies.findIndex(([npc, count]) => npc.name === action.npc.name);
//                 if (index !== -1) {
//                     if (draft.enemies[index][1] > 1)
//                         draft.enemies[index][1]--;
//                     else
//                         draft.enemies.splice(index, 1);
//                 }
//             });
//         case "changeMonsterSort":
//             return produce(state, draft => {
//                 draft.monster_sort_by = action.kind;
//                 draft.monster_sort_dir = action.direction;
//             });
//         case "changeMonsterPage":
//             return produce(state, draft => {
//                 draft.monster_page_num = action.page_num;
//             });
//     }
//     return state;
// }
