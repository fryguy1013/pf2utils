import * as React from "react";

import "./main.css";

import { EncounterState } from "../types";
import { calcXpBudget, calcDifficulty, encounter_difficulties } from '../utils';

import { Dropdown, Form, Grid, List } from 'semantic-ui-react'

interface GroupInfoProps {
    encounter: EncounterState;
    setPartyLevel: (level: number) => void;
    setNumCharacters: (num: number) => void;
}

export function GroupInfo(props: GroupInfoProps) {
    const { encounter, setPartyLevel, setNumCharacters } = props;

    const level_options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
        .map(x => ({ key: x, text: 'Level ' + x, value: x }));
    const player_options = [2, 3, 4, 5, 6, 7, 8, 9, 10]
        .map(x => ({ key: x, text: x + ' players', value: x }));
    const xp_budget = calcXpBudget(encounter.num_characters);
    const difficulty = calcDifficulty(encounter);

    return (
        <Grid columns={2}>
            <Grid.Row>
                <Grid.Column width={10} stretched>
                    <Form size='small'>
                        <h2>Group Info</h2>
                        <Form.Group>
                            <Form.Field options={level_options} item selection
                                control={Dropdown}
                                label='Party Level'
                                value={encounter.party_level}
                                onChange={(_: any, d: any) => setPartyLevel(d.value)}
                                style={{ minWidth: '10em', width: '10em' }} />
                            <Form.Field options={player_options} item selection
                                control={Dropdown}
                                label='Party Size'
                                value={encounter.num_characters}
                                onChange={(_: any, d: any) => setNumCharacters(d.value)}
                                style={{ minWidth: '10em', width: '10em' }} />
                        </Form.Group>
                    </Form>
                </Grid.Column>
                <Grid.Column width={6} textAlign='right'>
                    <List>
                        {encounter_difficulties.map((d, index) =>
                            <List.Item key={index}>
                                <List.Content className={d === difficulty.difficulty_name ? 'active_difficulty' : ''}>
                                    {d}: {xp_budget[d]} XP
                                </List.Content>
                            </List.Item>)}
                    </List>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}
