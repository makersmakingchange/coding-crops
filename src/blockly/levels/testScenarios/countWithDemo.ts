/**
 * @license
 * Copyright 2026 Neil Squire Society - Makers Making Change
 * SPDX-License-Identifier: Apache-2.0
 */

import {BlockDef, chainBlocks, processBlocks} from "../../levelManager";
import {
    countWithVarBlock,
    nextDayBlock,
    plantBlockWithComplexInputs, tileAction,
} from "../levelBuilder";
import {createAriaNumberInstance} from "../../blocks/mathBlocks";

const firstLoop: BlockDef[] = [
    plantBlockWithComplexInputs('Sunflower', undefined, 'i', createAriaNumberInstance(1, 'row'), undefined),
    plantBlockWithComplexInputs('Corn', undefined, 'i', createAriaNumberInstance(2, 'row'), undefined),
    plantBlockWithComplexInputs('Pumpkin', undefined, 'i', createAriaNumberInstance(3, 'row'), undefined)
];

const waterCornAndPumpkin: BlockDef[] = [
    tileAction('water', 'i', undefined, undefined, createAriaNumberInstance(2, 'column')),
    tileAction('water', 'i', undefined, undefined, createAriaNumberInstance(3, 'column'))
];

const countWithDemoBlocks: BlockDef[] = [
    countWithVarBlock('i', 1, 3, 1, firstLoop),
    countWithVarBlock('i', 1, 3, 1, waterCornAndPumpkin),
    nextDayBlock,
    countWithVarBlock('i', 1, 3, 1, waterCornAndPumpkin),
    nextDayBlock,
    countWithVarBlock('i', 1, 3, 1, [tileAction('harvest', 'i', undefined, undefined, createAriaNumberInstance(3, 'column'))]),
];

export const countWithDemo = {
    blocks: {
        languageVersion: 0,
        blocks: [processBlocks(countWithDemoBlocks)],
    },
};