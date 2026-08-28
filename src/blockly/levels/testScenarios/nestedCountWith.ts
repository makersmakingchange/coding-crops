import {BlockDef, chainBlocks, processBlocks} from "../../levelManager";
import {
    countWithVarBlock,
    nextDayBlock,
    plantBlockWithComplexInputs, repeatBlock, tileAction,
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

const nestedCountBlocks: BlockDef[] = [
    countWithVarBlock('i', 1, 3, 1, firstLoop),
    repeatBlock(2, [countWithVarBlock('i', 1, 3, 1, waterCornAndPumpkin), nextDayBlock]),
    countWithVarBlock('i', 1, 3, 1, [tileAction('harvest', 'i', undefined, undefined, createAriaNumberInstance(3, 'column'))]),
];

export const nestedCountWith = {
    blocks: {
        languageVersion: 0,
        blocks: [processBlocks(nestedCountBlocks)],
    },
};