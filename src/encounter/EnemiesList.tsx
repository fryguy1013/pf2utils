import * as React from "react";
import { connect } from "react-redux";
import { AppState } from "../store";

import "./main.css";

import { EncounterState } from "../store/encounter/types";
import { addNpc, removeNpc } from "../store/encounter/actions";

import { Item, Input, Message, List, Button, Grid, Header } from 'semantic-ui-react'
import { calcDifficulty } from "../store/encounter/utils";

interface AppProps {
    addNpc: typeof addNpc;
    removeNpc: typeof removeNpc;
    encounter: EncounterState;
}

class EnemiesList extends React.Component<AppProps> {
    render() {
        const difficulty = calcDifficulty(this.props.encounter);

        return (
            <div>
                <h2>Encounter Info</h2>
                <List>

                    {this.props.encounter.enemies.map(([enemy, count]) => 
                        <List.Item>
                            <List.Content floated='right'>
                            <Button.Group size='mini' attached='right'>
                                    <Button color='green' onClick={(_: any, d: any) => this.props.addNpc(enemy)}>+</Button>
                                </Button.Group>
                                <Input size='mini' className='enemy_count' value={count}
                                        disabled
                                        style={{ minWidth: '4em', width: '4em', verticalAlign: 'middle', horizontalAlign: 'center' }}/>
                                <Button.Group size='mini' attached='left'>
                                    <Button color='red' onClick={(_: any, d: any) => this.props.removeNpc(enemy)}>-</Button>
                                </Button.Group>
                            </List.Content>
                            <List.Content verticalAlign='middle'>
                                <Item.Header>
                                    {enemy.name}
                                </Item.Header>
                                CR {enemy.cr}

                            </List.Content>
                        </List.Item>
                    )}
                </List>

                {this.props.encounter.enemies.length === 0 ?
                    <Message color='blue'>Add enemies to the encounter to see the difficulty</Message>
                    :
                    <Grid columns={2}>
                        <Grid.Row>
                            <Grid.Column>
                                <h2>Difficulty: {difficulty.difficulty_name}</h2>
                            </Grid.Column>
                            <Grid.Column>
                                <Header as='h2' style={{ textAlign: 'right' }}>Total XP: {difficulty.total_xp}
                                    {difficulty.total_xp !== difficulty.actual_xp ? <Header.Subheader style={{ textAlign: 'right' }}>Actual XP: {difficulty.actual_xp}</Header.Subheader> : null}
                                </Header>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    }
            </div>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    encounter: state.encounter,
});

export default connect(
    mapStateToProps,
    { addNpc, removeNpc }
)(EnemiesList);
