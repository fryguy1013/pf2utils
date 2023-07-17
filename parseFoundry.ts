import * as fs from 'fs';
import * as path from 'path';

// download from https://github.com/foundryvtt/pf2e/releases/latest/download/json-assets.zip
const dir = "C:\\Users\\frygu\\Downloads\\packs";

const files = fs.readdirSync(dir);

const unknowns: string[] = [];
function sourceMap(source: string) {
    const map = {
        "Pathfinder #145: Hellknight Hill": "AoA1",
        "Pathfinder #146: Cult of Cinders": "AoA2",
        "Pathfinder #147: Tomorrow Must Burn": "AoA3",
        "Pathfinder #148: Fires of the Haunted City": "AoA4",
        "Pathfinder #149: Against the Scarlet Triad": "AoA5",
        "Pathfinder #150: Broken Promises": "AoA6",
        "Pathfinder #151: The Show Must Go On": "EC1",
        "Pathfinder #152: Legacy of the Lost God": "EC2",
        "Pathfinder #153: Life's Long Shadows": "EC3",
        "Pathfinder #154: Siege of the Dinosaurs": "EC4",
        "Pathfinder #155: Lord of the Black Sands": "EC5",
        "Pathfinder #156: The Apocalypse Prophet": "EC6",
        "Pathfinder #157: Devil at the Dreaming Palace": "AoE1",
        "Pathfinder #158: Sixty Feet Under": "AoE2",
        "Pathfinder #159: All or Nothing": "AoE3",
        "Pathfinder #160: Assault on Hunting Lodge Seven": "AoE4",
        "Pathfinder #161: Belly of the Black Whale": "AoE5",
        "Pathfinder #162: Ruins of the Radiant Siege": "AoE6",
        "Pathfinder #163: Ruins of Gauntlight": "AV1",
        "Pathfinder #164: Hands of the Devil": "AV2",
        "Pathfinder #165: Eyes of Empty Death": "AV3",
        "Pathfinder #166: Despair on Danger Island": "FoRP1",
        "Pathfinder #167: Ready? Fight!": "FoRP2",
        "Pathfinder #168: King of the Mountain": "FoRP3",
        "Pathfinder #169: Kindled Magic": "SoT1",
        "Pathfinder #170: Spoken on the Song Wind": "SoT2",
        "Pathfinder #171: Hurricane's Howl": "SoT3",
        "Pathfinder #172: Secrets of the Temple-City": "SoT4",
        "Pathfinder #173: Doorway to the Red Star": "SoT5",
        "Pathfinder #174: Shadows of the Ancients": "SoT6",
        "Pathfinder #175: Broken Tusk Moon": "QFF1",
        "Pathfinder #176: Lost Mammoth Valley": "QFF2",
        "Pathfinder #177: Burning Tundra": "QFF3",
        "Pathfinder #178: Punks in a Powder Keg": "OoA1",
        "Pathfinder #179: Cradle of Quartz": "OoA2",
        "Pathfinder #180: The Smoking Gun": "OoA3",
        "Pathfinder #181: Zombie Feast": "BL1",
        "Pathfinder #182: Graveclaw": "BL2",
        "Pathfinder #183: Field of Maidens": "BL3",
        "Pathfinder #184: The Ghouls Hunger": "BL4",
        "Pathfinder #185: A Taste of Ashes": "BL5",
        "Pathfinder #186: Ghost King's Rage": "BL6",
        "Pathfinder #187: The Seventh Arch": "GW1",
        "Pathfinder #188: They Watched the Stars": "GW2",
        "Pathfinder #189: Dreamers of the Nameless Spires": "GW3",
        "Pathfinder #190: The Choosing": "SF1",
        "Pathfinder #191: The Destiny War": "SF2",
        "Pathfinder #192: Worst of All Possible Worlds": "SF3",
        "Pathfinder Abomination Vaults Hardcover Compilation": "AV",
        "Pathfinder Adventure: A Few Flowers More": "FFM",
        "Pathfinder Adventure: A Fistful of Flowers": "FoF",
        "Pathfinder Adventure: Crown of the Kobold King": "CKK",
        "Pathfinder Adventure: Little Trouble in Big Absalom": "LTiBA",
        "Pathfinder Adventure: Malevolence": "M",
        "Pathfinder Adventure: Night of the Gray Death": "NotGD",
        "Pathfinder Adventure: Shadows at Sundown": "SaS",
        "Pathfinder Adventure: The Enmity Cycle": "EC",
        "Pathfinder Adventure: The Fall of Plaguestone": "FoP",
        "Pathfinder Adventure: The Slithering": "S",
        "Pathfinder Adventure: Troubles in Otari": "TiO",
        "Pathfinder Beginner Box": "BB",
        "Pathfinder Bestiary": "B1",
        "Pathfinder Bestiary 2": "B2",
        "Pathfinder Bestiary 3": "B3",
        "Pathfinder Blog": "Blog",
        "Pathfinder Blog: April Fool's Bestiary": "Blog",
        "Pathfinder Book of the Dead": "BotD",
        "Pathfinder Bounty #10: Hillcross Roundup": "B-10",
        "Pathfinder Bounty #14: The Blackwood Truce": "B-14",
        "Pathfinder Bounty #15: Treasure off the Coast": "B-15",
        "Pathfinder Bounty #16: Boom Town Betrayal": "B-16",
        "Pathfinder Bounty #17: Sodden Stories": "B-17",
        "Pathfinder Bounty #18: From Family Lost": "B-18",
        "Pathfinder Bounty #1: The Whitefang Wyrm": "B-1",
        "Pathfinder Bounty #20: Burden in Bloodcove": "B-20",
        "Pathfinder Bounty #21: Against the Unliving": "B-21",
        "Pathfinder Bounty #3: Shadows and Scarecrows": "B-3",
        "Pathfinder Bounty #5: Witch's Winter Holiday": "B-5",
        "Pathfinder Bounty #9: Fishing in Anthusis": "B-9",
        "Pathfinder Core Rulebook": "CRB",
        "Pathfinder Dark Archive": "DA",
        "Pathfinder Dark Archive Web Supplement: In Darkness": "DA",
        "Pathfinder Gamemastery Guide": "GMG",
        "Pathfinder Kingmaker": "KM",
        "Pathfinder Lost Omens: Absalom, City of Lost Omens": "LO:A",
        "Pathfinder Lost Omens: Character Guide": "LO:CG",
        "Pathfinder Lost Omens: Highhelm": "LO:HH",
        "Pathfinder Lost Omens: Impossible Lands": "LO:IL",
        "Pathfinder Lost Omens: Monsters of Myth": "LO:MoM",
        "Pathfinder Lost Omens: The Grand Bazaar": "LO:GB",
        "Pathfinder Lost Omens: The Mwangi Expanse": "LO:ME",
        "Pathfinder Lost Omens: Travel Guide": "LO:TG",
        "Pathfinder One-Shot #1: Sundered Waves": "SW",
        "Pathfinder One-Shot #2: Dinner at Lionlodge": "DaL",
        "Pathfinder One-Shot #4: Mark of the Mantis": "MotM",
        "Pathfinder Society Intro #1: The Second Confirmation": "PFS-I1",
        "Pathfinder Society Intro #2: United in Purpose": "PFS-I2",
        "Pathfinder Society Intro: Year of Boundless Wonder": "PFS-I",
        "Pathfinder Society Intro: Year of Shattered Sanctuaries": "PFS-I",
        "Pathfinder Society Special #3-98: Expedition Into Pallid Peril": "PFS3-98",
        "Pathfinder Society Special #3-99: Fate in the Future": "PFS3-99",
        "Pathfinder Society: Season 1": "PFS-S1",
    };
    let ret = map[source];

    let match;
    if (ret === undefined && (match = source.match(/Pathfinder Society Quest \#(\d+): .*/))) {
        ret = `PFS-Q${match[1]}`;
    } else if (ret === undefined && (match = source.match(/Pathfinder Society Scenario \#(\d+)-(\d+): .*/))) {
        ret = `PFS${match[1]}-${match[2]}`;
    }

    if (ret === undefined && !unknowns.includes(source))
        unknowns.push(source);
    return ret;
}

const results: any[] = [];
for (const fileName of files) {
    const fullPath = path.join(dir, fileName);
    const contents = fs.readFileSync(fullPath, "utf-8");
    const data: any = JSON.parse(contents);

    let total = 0, hasType = 0;
    for (const item of data) {
        if (item.type !== "npc")
            continue;

        const source = item.system.details.source.value;
        const npc = {
            name: item.name,
            type: item.system.traits.value,
            size: item.system.traits.size.value,
            sources: {
                [sourceMap(source)]: source,
            },
            cr: item.system.details.level.value,
        };

        total += 1;
        hasType += (!npc.type) ? 1 : 0;

        results.push(npc);
    }

    // if (total > 0)
    //     console.log(`${fileName} ${hasType} / ${total}`);
}

unknowns.sort();
for (const source of unknowns) {
    console.log(`    "${source}": "",`);
}

fs.writeFileSync("./public/npcs.json", JSON.stringify(results));