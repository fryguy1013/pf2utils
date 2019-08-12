import * as React from "react";
import { connect } from "react-redux";
import { AppState } from "../store";

import "./main.css";

import { EncounterState } from "../store/encounter/types";
import { setPartyLevel, setNumCharacters } from "../store/encounter/actions";
import { calcXpBudget, calcDifficulty, encounter_difficulties } from '../store/encounter/utils';

import { Dropdown, Form, Grid, List } from 'semantic-ui-react'

interface AppProps {
    setPartyLevel: typeof setPartyLevel;
    setNumCharacters: typeof setNumCharacters;
    encounter: EncounterState;
}

class GroupInfo extends React.Component<AppProps> {
    render() {
        const level_options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
            .map(x => ({ key: x, text: 'Level ' + x, value: x }));
        const player_options = [2, 3, 4, 5, 6, 7, 8, 9, 10]
            .map(x => ({ key: x, text: x + ' players', value: x }));
        const xp_budget = calcXpBudget(this.props.encounter.num_characters);
        const difficulty = calcDifficulty(this.props.encounter);

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
                                    value={this.props.encounter.party_level}
                                    onChange={(_: any, d: any) => this.props.setPartyLevel(d.value)}
                                    style={{ minWidth: '10em', width: '10em' }} />
                                <Form.Field options={player_options} item selection
                                    control={Dropdown}
                                    label='Party Size'
                                    value={this.props.encounter.num_characters}
                                    onChange={(_: any, d: any) => this.props.setNumCharacters(d.value)}
                                    style={{ minWidth: '10em', width: '10em' }} />
                            </Form.Group>
                        </Form>
                    </Grid.Column>
                    <Grid.Column width={6} textAlign='right'>
                        <List>
                            {encounter_difficulties.map(d =>
                                <List.Item>
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
}

const mapStateToProps = (state: AppState) => ({
    encounter: state.encounter,
});

export default connect(
    mapStateToProps,
    { setPartyLevel, setNumCharacters }
)(GroupInfo);
