/**
 * @license
 * Copyright 2026 Neil Squire Society - Makers Making Change
 * SPDX-License-Identifier: Apache-2.0
 */

import { BlockDef, processBlocks} from "../../levelManager";
import {harvestBlock, nextDayBlock, plantBlock, waterBlock} from "../levelBuilder";

const level1SolutionBlocks: BlockDef[] = [
    plantBlock(1, 2),
    waterBlock(1, 2),
    nextDayBlock,
    waterBlock(1, 2),
    nextDayBlock,
    harvestBlock(1, 2)
];

export const level1Solution = {
    blocks: {
        languageVersion: 0,
        blocks: [processBlocks(level1SolutionBlocks)],
    },
};
