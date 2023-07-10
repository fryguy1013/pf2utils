import * as React from "react";

import "./main.css";

import { EncounterState, NpcInfo } from "../types";

import { Table, Button, Icon, Pagination } from "semantic-ui-react";
import { monster_list } from "../store/encounter/monsters";

interface MonsterProps {
    addNpc: (npc: NpcInfo) => void;
}

export type UpdateMessageParam = React.SyntheticEvent<{ value: string }>;

export function MonsterList(props: MonsterProps) {
    const { addNpc } = props;

    const [sortBy, setSortBy] = React.useState("name");
    const [sortDir, setSortDir] = React.useState("asc");
    const [pageNum, setPageNum] = React.useState(1);

    const changeSort = (key: string) => {
        if (sortBy === key) {
            setSortDir(sortDir === "asc" ? "desc" : "asc");
        } else {
            setSortBy(key);
            setSortDir("asc");
        }
    };

    let sort_by_column =
        sortBy === "name"
            ? (a: NpcInfo, b: NpcInfo) => a.name.localeCompare(b.name)
            : sortBy === "cr"
            ? (a: NpcInfo, b: NpcInfo) => a.cr - b.cr
            : sortBy === "type"
            ? (a: NpcInfo, b: NpcInfo) => a.type.localeCompare(b.type)
            : sortBy === "source"
            ? (a: NpcInfo, b: NpcInfo) => a.source.localeCompare(b.source)
            : (a: NpcInfo, b: NpcInfo) => 0;

    let sort_fn =
        sortDir === "desc"
            ? (a: NpcInfo, b: NpcInfo) => -sort_by_column(a, b)
            : sort_by_column;

    const npcs = monster_list;
    npcs.sort(sort_fn);

    const start = (pageNum - 1) * 10;
    const end = start + 10;

    const sort_icon =
        sortDir === "asc" ? (
            <Icon name="angle up" />
        ) : (
            <Icon name="angle down" />
        );

    const column_header = (name: string, key: string, columns: any) => (
        <Table.HeaderCell width={columns}>
            <div onClick={() => changeSort(key)}>
                {name}
                {sortBy === key ? sort_icon : <Icon />}
            </div>
        </Table.HeaderCell>
    );

    return (
        <Table>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell width={1}></Table.HeaderCell>
                    {column_header("Name", "name", 5)}
                    {column_header("CR", "cr", 1)}
                    {/* {column_header('Size', 'size')} */}
                    {column_header("Type", "type", 3)}
                    {/* {column_header('Alignment', 'alignment')} */}
                    {column_header("Source", "source", 3)}
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {npcs.slice(start, end).map((npc, index) => (
                    <Table.Row key={index}>
                        <Table.Cell>
                            <Button
                                color="green"
                                size="mini"
                                icon
                                onClick={(_: any, d: any) => addNpc(npc)}
                            >
                                <Icon name="plus" />
                            </Button>
                        </Table.Cell>
                        <Table.Cell>{npc.name}</Table.Cell>
                        <Table.Cell color="blue">{npc.cr}</Table.Cell>
                        {/* <Table.Cell>{npc.size}</Table.Cell> */}
                        <Table.Cell>{npc.type}</Table.Cell>
                        {/* <Table.Cell>{npc.alignment}</Table.Cell> */}
                        <Table.Cell>{npc.source}</Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
            <Table.Footer>
                <Table.Row>
                    <Table.HeaderCell colSpan="5">
                        <Pagination
                            totalPages={Math.ceil(npcs.length / 10)}
                            activePage={pageNum}
                            onPageChange={(e, d) =>
                                setPageNum(+(d.activePage || 0))
                            }
                            firstItem={null}
                            lastItem={null}
                        />
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Footer>
        </Table>
    );
}
