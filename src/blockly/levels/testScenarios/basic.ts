/**
 * @license
 * Copyright 2026 Neil Squire Society - Makers Making Change
 * SPDX-License-Identifier: Apache-2.0
 */

import {chainBlocks, BlockDef, processBlocks} from "../../levelManager";
import {plantBlock, waterBlock, harvestBlock, nextDayBlock} from "../levelBuilder";

// Define your level blocks in order
const basicBlocks: BlockDef[] = [
    plantBlock(1, 1),
    waterBlock(1, 1),
    nextDayBlock,
    waterBlock(1, 1),
    nextDayBlock,
    harvestBlock(1, 1)
];

export const basic = {
    blocks: {
        languageVersion: 0,
        blocks: [processBlocks(basicBlocks)],
    },
};
