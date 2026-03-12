import {BlockDef, processBlocks} from "../levelManager";
import {createAriaNumberInstance} from "../blocks/mathBlocks";

const rowBlock = createAriaNumberInstance(1, 'Row number');
const colBlock = createAriaNumberInstance(1, 'Column number');

export const plantBlock = (row: number, col: number): BlockDef => ({
    type: 'plant',
    inline: true,
    inputs: {
        ROW: {
            shadow: createAriaNumberInstance(row, 'Row number'),
        },
        COLUMN: {
            shadow: createAriaNumberInstance(col, 'Column number'),
        }
    }
});

export const waterBlock = (row: number, col: number): BlockDef => ({
    type: 'water',
    inline: true,
    inputs: {
        ROW: {
            shadow: createAriaNumberInstance(row, 'Row number')
        },
        COLUMN: {
            shadow: createAriaNumberInstance(col, 'Column number')
        }
    }
});

export const harvestBlock = (row: number, col: number): BlockDef => ({
    type: 'harvest',
    inline: true,
    inputs: {
        ROW: {
            shadow: createAriaNumberInstance(row, 'Row number')
        },
        COLUMN: {
            shadow: createAriaNumberInstance(col, 'Column number')
        }
    }
});

export const nextDayBlock: BlockDef = {
    type: 'next_day'
}

export const numShadow = (num: number) => ({
    type: 'math_number',
    fields: { NUM: num }
});

export const repeatBlock = (blocks: BlockDef[]): BlockDef => ({
    type: 'controls_repeat',
    fields: {
        TIMES: { shadow: numShadow(10) }
    },
    inputs: {
        DO: { block: processBlocks(blocks) }
    }
});