import * as React from "react";
import { connect } from "react-redux";
import { AppState } from "../store";

import "./main.css";

import { EncounterState, NpcInfo } from "../store/encounter/types";
import { addNpc, changeMonsterSort, changeMonsterPage } from "../store/encounter/actions";

import { Table, Button, Icon, Pagination } from 'semantic-ui-react'
import { monster_list } from "../store/encounter/monsters";

interface AppProps {
    addNpc: typeof addNpc;
    changeMonsterSort: typeof changeMonsterSort;
    changeMonsterPage: typeof changeMonsterPage;
    encounter: EncounterState;
}

export type UpdateMessageParam = React.SyntheticEvent<{ value: string }>;

class MonsterList extends React.Component<AppProps> {
    render() {
        let sort_by_column =
            this.props.encounter.monster_sort_by === 'name' ? (a: NpcInfo, b: NpcInfo) => a.name.localeCompare(b.name) :
            this.props.encounter.monster_sort_by === 'cr' ? (a: NpcInfo, b: NpcInfo) => a.cr - b.cr :
            this.props.encounter.monster_sort_by === 'type' ? (a: NpcInfo, b: NpcInfo) => a.type.localeCompare(b.type) :
            this.props.encounter.monster_sort_by === 'source' ? (a: NpcInfo, b: NpcInfo) => a.source.localeCompare(b.source) :
                (a: NpcInfo, b: NpcInfo) => 0;
        let sort_fn = (this.props.encounter.monster_sort_dir === 'desc') ? ((a : NpcInfo, b : NpcInfo) => -sort_by_column(a, b)) : sort_by_column;
        const npcs = monster_list;
        npcs.sort(sort_fn);
        const start = (this.props.encounter.monster_page_num-1)*10;
        const end = start + 10;

        const sort_icon = this.props.encounter.monster_sort_dir === 'asc' ? <Icon name='angle up'/> : <Icon name='angle down'/>;

        const column_header = (name: string, key: string, columns: any) => (
            <Table.HeaderCell width={columns}>
                <div onClick={() => this.props.changeMonsterSort(key, this.props.encounter.monster_sort_by === key && this.props.encounter.monster_sort_dir === 'asc' ? 'desc' :'asc')}>
                    {name}{this.props.encounter.monster_sort_by === key ? sort_icon : <Icon/>}
                </div>
            </Table.HeaderCell>);

        return (
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width={1}></Table.HeaderCell>
                        {column_header('Name', 'name', 5)}
                        {column_header('CR', 'cr', 1)}
                        {/* {column_header('Size', 'size')} */}
                        {column_header('Type', 'type', 3)}
                        {/* {column_header('Alignment', 'alignment')} */}
                        {column_header('Source', 'source', 3)}
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {npcs.slice(start, end).map(npc => (
                        <Table.Row>
                            <Table.Cell>
                                <Button color='green' size='mini' icon onClick={(_: any, d: any) => this.props.addNpc(npc)}>
                                    <Icon name='plus'/>
                                </Button>
                            </Table.Cell>
                            <Table.Cell>{npc.name}</Table.Cell>
                            <Table.Cell color='blue'>{npc.cr}</Table.Cell>
                            {/* <Table.Cell>{npc.size}</Table.Cell> */}
                            <Table.Cell>{npc.type}</Table.Cell>
                            {/* <Table.Cell>{npc.alignment}</Table.Cell> */}
                            <Table.Cell>{npc.source}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan='5'>
                            <Pagination
                                totalPages={Math.ceil(npcs.length / 10)}
                                activePage={this.props.encounter.monster_page_num}
                                onPageChange={(e, d) => this.props.changeMonsterPage(+(d.activePage || 0))}
                                firstItem lastItem/>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    encounter: state.encounter,
});

export default connect(
    mapStateToProps,
    { addNpc, changeMonsterSort, changeMonsterPage }
)(MonsterList);
