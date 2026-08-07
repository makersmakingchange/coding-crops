/**
 * @license
 * Copyright 2026 Neil Squire Society - Makers Making Change
 * SPDX-License-Identifier: Apache-2.0
 */


import {createAriaNumberInstance} from "../../blocks/mathBlocks";

const rowBlock = createAriaNumberInstance(1, 'Row number');
const colBlock = createAriaNumberInstance(1, 'Column number');

export const logicCategoryContents = [

    {
        type: 'controls_if',
        kind: 'block',
        id: 'if_block',
    },
    {
        type: 'if_tile_state',
        kind: 'block',
        inputs: {
            ROW: {
                shadow: rowBlock
            },
            COLUMN: {
                shadow: colBlock
            },
            DO: {
            },
            ELSE: {
            }
        },
        fields: {
            STATE: 'EMPTY'
        }
    },
    {
        kind: 'label',
        text: 'Condition Blocks',
    },
    {
        kind: 'block',
        type: 'logic_compare',
        fields: {
            OP: 'EQ'
        }
    },
    {
        kind: 'block',
        type: 'logic_operation',
        fields: {
            OP: 'AND'
        }
    },
    {
        kind: 'block',
        type: 'logic_negate',
    },
    {
        kind: 'block',
        type: 'logic_boolean',
        fields: {
            BOOL: 'TRUE'
        }
    },

]