import * as React from "react";

import "./main.css";

import { EncounterState, NpcInfo } from "../types";

import { Input, Grid, Table, Button, Icon, Pagination, Label, Loader, Checkbox, SemanticCOLORS } from "semantic-ui-react";
import { xpDifficultyForEnemy } from "../utils";

interface MonsterProps {
    addNpc: (npc: NpcInfo) => void;
    partyLevel: number;
}

export type UpdateMessageParam = React.SyntheticEvent<{ value: string }>;

function sizeToText(size: string) {
    if (size === "tiny") return "Tiny";
    if (size === "sm") return "Small";
    if (size === "med") return "Medium";
    if (size === "lg") return "Large";
    if (size === "huge") return "Huge";
    if (size === "grg") return "Gargantuan";
    return size;
}

function sizeOrder(size: string) {
    if (size === "tiny") return 0;
    if (size === "sm") return 1;
    if (size === "med") return 2;
    if (size === "lg") return 3;
    if (size === "huge") return 4;
    if (size === "grg") return 5;
    return 0;
}

function xpColor(levelDiff: number): SemanticCOLORS {
    if (levelDiff <= -4) return "grey";
    if (levelDiff == -3) return "blue";
    if (levelDiff == -2) return "teal";
    if (levelDiff == -1) return "green";
    if (levelDiff == 0) return "olive";
    if (levelDiff == 1) return "yellow";
    if (levelDiff == 2) return "orange";
    if (levelDiff == 3) return "red";
    return "red";
}

export function MonsterList(props: MonsterProps) {
    const { addNpc, partyLevel } = props;

    const [sortBy, setSortBy] = React.useState("name");
    const [sortDir, setSortDir] = React.useState("asc");
    const [pageNum, setPageNum] = React.useState(1);
    const [filter, setFilter] = React.useState<string | undefined>(undefined);
    const [appropriate, setAppropriate] = React.useState(true);

    const changeSort = (key: string) => {
        if (sortBy === key) {
            setSortDir(sortDir === "asc" ? "desc" : "asc");
        } else {
            setSortBy(key);
            setSortDir("asc");
        }
    };

    const [baseNpcs, setBaseNpcs] = React.useState<NpcInfo[] | undefined>(undefined);

    React.useEffect(() => {
        (async () => {
            try {
                const response = await fetch("./npcs.json");
                const json = await response.json();
                setBaseNpcs(json as NpcInfo[]);
            } catch (error) {
                console.log("error fetching data");
            }
        })();
    }, []);

    const npcs: NpcInfo[] | undefined = React.useMemo(() => {
        if (baseNpcs === undefined)
            return undefined;

        const sortColFn =
            sortBy === "name"
                ? (a: NpcInfo, b: NpcInfo) => a.name.localeCompare(b.name)
                : sortBy === "cr"
                ? (a: NpcInfo, b: NpcInfo) => a.cr - b.cr
                : sortBy === "size"
                ? (a: NpcInfo, b: NpcInfo) => sizeOrder(a.size) - sizeOrder(b.size)
                : sortBy === "source"
                ? (a: NpcInfo, b: NpcInfo) => Object.keys(a.sources)[0].localeCompare(Object.keys(b.sources)[0])
                : (a: NpcInfo, b: NpcInfo) => 0;

        const sortFn =
            sortDir === "desc"
                ? (a: NpcInfo, b: NpcInfo) => -sortColFn(a, b)
                : sortColFn;


        const appropriateFn = (n: NpcInfo) => {
            if (!appropriate) return true;
            return n.cr >= partyLevel - 4 && n.cr <= partyLevel + 4;
        };

        const filterFn = (n: NpcInfo) => {
            if (filter === undefined) return true;
            return n.name.toUpperCase().includes(filter.toUpperCase()) ||
                n.type.some(t => t.toUpperCase().includes(filter.toUpperCase()));
        };

        return [...baseNpcs.filter(n =>
                appropriateFn(n) && filterFn(n)
            )]
            .sort(sortFn);
    }, [baseNpcs, sortBy, sortDir, filter, appropriate, partyLevel]);

    if (npcs === undefined) {
        return (
            <Loader active>Loading</Loader>
        );
    }

    const actualPageNum = Math.max(Math.min(npcs.length / 10, pageNum), 0);
    const start = (actualPageNum - 1) * 10;
    const end = start + 10;

    const sort_icon =
        sortDir === "asc" ? (
            <Icon name="angle up" />
        ) : (
            <Icon name="angle down" />
        );

    const column_header = (name: string, key: string, columns: any, textAlign?: any) => (
        <Table.HeaderCell width={columns} textAlign={textAlign}>
            <div onClick={() => changeSort(key)}>
                {textAlign=="center"?<Icon />:<></>}
                {name}
                {sortBy === key ? sort_icon : <Icon />}
            </div>
        </Table.HeaderCell>
    );

    const xp = (cr: number) => {
        return xpDifficultyForEnemy(partyLevel, cr);
    };

    return (
        <div>
            <Grid>
                <Grid.Column width={4}>
                    <Input
                        icon="search"
                        placeholder="Filter..."
                        onChange={(e, d) => setFilter(d.value)}/>
                </Grid.Column>
                <Grid.Column width={2} verticalAlign="middle" title="Filter to only party level -4 to party level +4">
                    <Checkbox
                        checked={appropriate}
                        onChange={(e) => setAppropriate(!appropriate)}
                        label="Appropriate"/>
                </Grid.Column>
                <Grid.Column floated='right' width={9} textAlign="right">
                    <Pagination
                        totalPages={Math.ceil(npcs.length / 10)}
                        activePage={actualPageNum}
                        onPageChange={(e, d) => setPageNum(+(d.activePage || 0))}
                        firstItem={null}
                        lastItem={null}
                    />
                </Grid.Column>
            </Grid>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width={1}></Table.HeaderCell>
                        {column_header("Name", "name", 7)}
                        {column_header("Level", "cr", 2)}
                        {column_header("Size", "size", 2)}
                        {column_header("Source", "source", 2)}
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
                            <Table.Cell>
                                <div>{npc.name}</div>
                                <div>{npc.type.map((t, i) => <Label key={i} size="tiny">{`${t[0].toUpperCase()}${t.substring(1)}`}</Label>)}</div>
                            </Table.Cell>
                            <Table.Cell color="blue">
                                <div>{npc.cr}</div>
                                <div><Label color={xpColor(npc.cr - partyLevel)} size="mini">{`${xp(npc.cr)} XP`}</Label></div>
                                {/* <div className={`text ${xpColor(npc.cr - partyLevel)}`}></div> */}
                            </Table.Cell>
                            <Table.Cell>
                                {sizeToText(npc.size)}
                            </Table.Cell>
                            <Table.Cell>
                                {Object.entries(npc.sources ?? {}).map(
                                    ([short, long]) => (
                                        <span key={short} title={long} className="reference">{short}</span>
                                    )
                                )}
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>

                <Table.Footer></Table.Footer>
            </Table>
        </div>
    );
}
