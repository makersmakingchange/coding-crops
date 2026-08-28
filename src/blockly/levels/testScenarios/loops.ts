/**
 * @license
 * Copyright 2026 Neil Squire Society - Makers Making Change
 * SPDX-License-Identifier: Apache-2.0
 */

import { BlockDef, processBlocks} from "../../levelManager";
import {nextDayBlock, plantBlock, waterBlock} from "../levelBuilder";

const loopsBlocks: BlockDef[] = [
    plantBlock(1, 1),
    waterBlock(1, 1),
    nextDayBlock,
    waterBlock(1, 1),
    nextDayBlock
];

export const loops = {
    blocks: {
        languageVersion: 0,
        blocks: [processBlocks(loopsBlocks)],
    },
};
