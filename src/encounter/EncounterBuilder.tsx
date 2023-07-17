import * as React from "react";

import "./main.css";

import { GroupInfo } from "./GroupInfo";
import { MonsterList } from "./MonsterList";
import { EnemiesList } from "./EnemiesList";
import { EncounterState, NpcInfo } from "../types";

import { Grid } from "semantic-ui-react";

const initialState: EncounterState = {
    num_characters: 4,
    party_level: 1,
    enemies: [],
};

interface Props {}

export function EncounterBuilder(props: Props) {
    const [encounter, setEncounter] =
        React.useState<EncounterState>(initialState);

    const addNpc = (npc: NpcInfo) => {
        setEncounter({
            ...encounter,
            enemies: [
                ...encounter.enemies,
                {
                    npc,
                    count: 1,
                },
            ],
        });
    };

    const increaseNpc = (npcIndex: number) => {
        setEncounter({
            ...encounter,
            enemies: encounter.enemies.map(({ npc, count }, index) => ({
                npc,
                count: index == npcIndex ? count + 1 : count,
            })),
        });
    };

    const decreaseNpc = (npcIndex: number) => {
        setEncounter({
            ...encounter,
            enemies: encounter.enemies
                .map(({ npc, count }, index) => ({
                    npc,
                    count: index == npcIndex ? count - 1 : count,
                }))
                .filter(({ count }) => count != 0),
        });
    };

    const setPartyLevel = (level: number) => {
        setEncounter({
            ...encounter,
            party_level: level,
        });
    };

    const setNumCharacters = (num: number) => {
        setEncounter({
            ...encounter,
            num_characters: num,
        });
    };

    return (
        <Grid columns={2}>
            <Grid.Row>
                <Grid.Column width={5}>
                    <GroupInfo
                        encounter={encounter}
                        setPartyLevel={setPartyLevel}
                        setNumCharacters={setNumCharacters}
                    />
                    <EnemiesList
                        encounter={encounter}
                        increaseNpc={increaseNpc}
                        decreaseNpc={decreaseNpc}
                    />
                </Grid.Column>
                <Grid.Column width={11}>
                    <MonsterList addNpc={addNpc} partyLevel={encounter.party_level}/>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}
