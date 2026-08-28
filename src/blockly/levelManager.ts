/**
 * @license
 * Copyright 2026 Neil Squire Society - Makers Making Change
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from 'blockly';
import { level1 } from './levels/lessons/level1';
import { level2 } from './levels/lessons/level2';
import { level3 } from './levels/lessons/level3';
import { freePlay } from './levels/lessons/freePlay';
import {basic} from "./levels/testScenarios/basic";
import {plantGrid} from "./levels/testScenarios/plantGrid";
import {loops} from "./levels/testScenarios/loops";
import {level1Solution} from "./levels/testScenarios/level1Solution";
import {level2Solution} from "./levels/testScenarios/level2Solution";
import {level3Solution} from "./levels/testScenarios/level3Solution";
import {countWithDemo} from './levels/testScenarios/countWithDemo';
import {nestedCountWith} from "./levels/testScenarios/nestedCountWith";

export type LevelConfig = {
    value: number | string;
    label: string;
    toolboxLevel: number;
    blocks: object;
};

export const LEVELS: LevelConfig[] = [
    { value: 1, label: 'Level 1', toolboxLevel: 1, blocks: level1 },
    { value: 2, label: 'Level 2', toolboxLevel: 2, blocks: level2 },
    { value: 3, label: 'Level 3', toolboxLevel: 3, blocks: level3 },
    { value: 'freePlay', label: 'Free Play', toolboxLevel: 3, blocks: freePlay },
];

export const SCENARIO_LEVELS: LevelConfig[] = [
    { value: 'basic', label: 'Basic Farm', toolboxLevel: 3, blocks: basic },
    { value: 'plantGrid', label: 'Plant Grid', toolboxLevel: 3, blocks: plantGrid },
    { value: 'nestedCountWith', label: 'Nested Count With', toolboxLevel: 3, blocks: nestedCountWith },
    { value: 'countWithDemo', label: 'Count With', toolboxLevel: 3, blocks: countWithDemo },
    { value: 'level1Solution', label: 'Level 1 Solution', toolboxLevel: 3, blocks: level1Solution },
    { value: 'level2Solution', label: 'Level 2 Solution', toolboxLevel: 3, blocks: level2Solution },
    { value: 'level3Solution', label: 'Level 3 Solution', toolboxLevel: 3, blocks: level3Solution },
];

const ALL_LEVELS: LevelConfig[] = [...LEVELS, ...SCENARIO_LEVELS];

export function getLevelConfig(value: number | string): LevelConfig | undefined {
    return ALL_LEVELS.find(l => l.value === value);
}

export type BlockDef = {
    kind?: string;
    type: string;
    deletable?: boolean;
    inline?: boolean;
    inputs?: Record<string, any>;
    fields?: Record<string, any>;
    next?: BlockDef;
    parent?: BlockDef;
    shadow?: BlockDef;
    output?: string;
    mutator?: string;
    statements?: Record<string, any>;
    colour?: string;
    tooltip?: string;
    helpUrl?: string;
};

export function chainBlocks(blocks: BlockDef[]): any {
    if (blocks.length === 0) return null;

    const [first, ...rest] = blocks;
    return {
        ...first,
        next: rest.length ? { block: chainBlocks(rest) } : undefined,
    };
}

export function processBlocks(blocks: BlockDef[]): any {
        return {
            type: 'begin_farm',
            deletable: false,
            inputs: {
                STATEMENTS: {
                    block: chainBlocks(blocks)
                    }
                },
        }
}

export const load = (workspace: Blockly.Workspace, level: number | string) => {
    const config = getLevelConfig(level);
    if (!config) {
        console.warn(`No level config found for level ${level}`);
        return;
    }

    Blockly.Events.disable();
    try {
        Blockly.serialization.workspaces.load(config.blocks, workspace, { recordUndo: false });
    } catch (err) {
        console.error(`Failed to load level ${level}:`, err);
    } finally {
        Blockly.Events.enable();
    }
};

