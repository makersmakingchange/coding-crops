/**
 * @license
 * Copyright 2026 Neil Squire Society - Makers Making Change
 * SPDX-License-Identifier: Apache-2.0
 */

import {chainBlocks, BlockDef, processBlocks} from "../../levelManager";
import {harvestBlock, nextDayBlock, plantBlock, waterBlock} from "../levelBuilder";

const innerLoop: BlockDef = {
    type: 'controls_repeat',
    fields: {
        TIMES: 2,
    },
    inputs: {
        DO: {
            block: chainBlocks([
                waterBlock(1, 1),
                nextDayBlock,
            ]),
        },
    },
};

const level2SolutionBlocks: BlockDef[] = [
    {
        type: 'controls_repeat',
        fields: {
            TIMES: 4,
        },
        inputs: {
            DO: {
                block: chainBlocks([
                    plantBlock(1,1),
                    innerLoop,
                    harvestBlock(1, 1)
                ]),
            },
        },
    }
];

export const level2Solution = {
    blocks: {
        languageVersion: 0,
        blocks: [processBlocks(level2SolutionBlocks)],
    },
};
