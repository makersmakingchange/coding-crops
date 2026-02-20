import * as Blockly from 'blockly';
import { level1 } from './levels/level1';
import { level2 } from './levels/level2';
import { level3 } from './levels/level3';
import {level97} from "./levels/level97";
import {level98} from "./levels/level98";
import {level99} from "./levels/level99";

const levels: Record<number | string, any> = {
    1: level1,
    2: level2,
    3: level3,
    97: level97,
    98: level98,
    99: level99,
};

export type BlockDef = {
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
    const data = levels[level];
    if (!data) {
        console.warn(`No Blockly data found for level ${level}`);
        return;
    }

    Blockly.Events.disable();
    try {
        Blockly.serialization.workspaces.load(data, workspace, { recordUndo: false });
    } catch (err) {
        console.error(`Failed to load level ${level}:`, err);
    } finally {
        Blockly.Events.enable();
    }
};

