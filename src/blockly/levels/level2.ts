/**
 * @license
 * Copyright 2026 Neil Squire Society - Makers Making Change
 * SPDX-License-Identifier: Apache-2.0
 */

import {chainBlocks, BlockDef, processBlocks} from "../levelManager";
import {nextDayBlock, plantBlock, waterBlock} from "./levelBuilder";

const numShadow = (num: number) => ({
    type: 'math_number',
    fields: { NUM: num }
});

const level2Actions: BlockDef[] = [
    plantBlock(1, 1),
    waterBlock(1, 1),
    nextDayBlock,
    waterBlock(1, 1),
    nextDayBlock,
];

const repeatBlock: BlockDef = {
    type: 'controls_repeat',
    fields: {
        TIMES: { shadow: numShadow(10) }
    },
    inputs: {
        DO: { block: processBlocks(level2Actions) }
    }
};

export const level2 = {
    blocks: {
        languageVersion: 0,
        blocks: [processBlocks(level2Actions)]
    }
};
