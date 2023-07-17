import * as React from "react";

import "./main.css";

import { EncounterState, NpcInfo } from "../types";

import {
    Item,
    Input,
    Message,
    List,
    Button,
    Grid,
    Header,
} from "semantic-ui-react";
import { calcDifficulty } from "../utils";

interface EnemiesListProps {
    encounter: EncounterState;
    increaseNpc: (npcIndex: number) => void;
    decreaseNpc: (npcIndex: number) => void;
}

export function EnemiesList(props: EnemiesListProps) {
    const { encounter, increaseNpc, decreaseNpc } = props;

    const difficulty = calcDifficulty(encounter);

    return (
        <div>
            <h2>Encounter Info</h2>
            <List>
                {encounter.enemies.map(({ npc, count }, index) => (
                    <List.Item key={index}>
                        <List.Content floated="right">
                            <Button.Group size="mini" attached="right">
                                <Button
                                    color="green"
                                    onClick={(_: any, d: any) =>
                                        increaseNpc(index)
                                    }
                                >
                                    +
                                </Button>
                            </Button.Group>
                            <Input
                                size="mini"
                                className="enemy_count"
                                value={count}
                                disabled
                                style={{
                                    minWidth: "4em",
                                    width: "4em",
                                    verticalAlign: "middle",
                                    horizontalAlign: "center",
                                }}
                            />
                            <Button.Group size="mini" attached="left">
                                <Button
                                    color="red"
                                    onClick={(_: any, d: any) =>
                                        decreaseNpc(index)
                                    }
                                >
                                    -
                                </Button>
                            </Button.Group>
                        </List.Content>
                        <List.Content verticalAlign="middle">
                            <Item.Header>{npc.name}</Item.Header>
                            Level {npc.cr}
                        </List.Content>
                    </List.Item>
                ))}
            </List>

            {encounter.enemies.length === 0 ? (
                <Message color="blue">
                    Add enemies to the encounter to see the difficulty
                </Message>
            ) : (
                <Grid columns={2}>
                    <Grid.Row>
                        <Grid.Column>
                            <h2>Difficulty: {difficulty.difficulty_name}</h2>
                        </Grid.Column>
                        <Grid.Column>
                            <Header as="h2" style={{ textAlign: "right" }}>
                                Total XP: {difficulty.total_xp}
                                {difficulty.total_xp !==
                                difficulty.actual_xp ? (
                                    <Header.Subheader
                                        style={{ textAlign: "right" }}
                                    >
                                        Actual XP: {difficulty.actual_xp}
                                    </Header.Subheader>
                                ) : null}
                            </Header>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            )}
        </div>
    );
}
