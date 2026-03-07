import {createAriaNumberInstance} from "../../blocks/mathBlocks";

const rowBlock = createAriaNumberInstance(1, 'Row number');
const colBlock = createAriaNumberInstance(1, 'Column number');

export const farmCategoryContents = [
    {
        kind: 'block',
        type: 'plant',
        inline: true,
        inputs: {
            ROW: {
                shadow: rowBlock
            },
            COLUMN: {
                shadow: colBlock
            }
        }
    },
    {
        kind: 'block',
        type: 'water',
        inline: true,
        inputs: {
            ROW: {
                shadow: rowBlock
            },
            COLUMN: {
                shadow: colBlock
            }
        }
    },
    {
        kind: 'block',
        type: 'harvest',
        inline: true,
        inputs: {
            ROW: {
                shadow: rowBlock
            },
            COLUMN: {
                shadow: colBlock
            }
        }
    },
    {
        kind: 'block',
        type: 'next_day'
    }
]

export const farmToolbox = {
    'kind': 'flyoutToolbox',
    'contents': farmCategoryContents,
};
