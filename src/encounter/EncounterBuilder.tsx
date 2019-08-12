import * as React from "react"
import { connect } from "react-redux"
import { AppState } from "../store"

import "./main.css";

import GroupInfo from "./GroupInfo"
import MonsterList from "./MonsterList"
import EnemiesList from "./EnemiesList"
import { EncounterState } from "../store/encounter/types";
import { setPartyLevel, setNumCharacters } from "../store/encounter/actions";

import { Grid } from 'semantic-ui-react'

interface AppProps {
    setPartyLevel: typeof setPartyLevel;
    setNumCharacters: typeof setNumCharacters;
    encounter: EncounterState;
}

class EncounterBuilder extends React.Component<AppProps> {
    render() {
        return (
            <Grid columns={2}>
                <Grid.Row>
                    <Grid.Column width={6}>
                        <GroupInfo />
                        <EnemiesList />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <MonsterList />
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
)(EncounterBuilder);
