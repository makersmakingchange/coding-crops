/**
 * @license
 * Copyright 2026 Neil Squire Society - Makers Making Change
 * SPDX-License-Identifier: Apache-2.0
 */

import {chainBlocks, BlockDef, processBlocks} from "../../levelManager";
import {tileAction} from "../levelBuilder";
import {createAriaNumberInstance} from "../../blocks/mathBlocks";

const numShadow = (num: number) => ({
    type: 'math_number',
    fields: {NUM: num}
});

const setVar = (name: string, value: number): BlockDef => ({
    type: 'variables_set',
    fields: {
        VAR: {name},
    },
    inputs: {
        VALUE: {shadow: numShadow(value)},
    },
});

const innerLoop: BlockDef = {
    type: 'controls_repeat',
    fields: {
        TIMES: 3,
    },
    inputs: {
        DO: {
            block: chainBlocks([
                tileAction('plant',
                    'row',
                    'column',
                    createAriaNumberInstance(1, 'row'),
                    createAriaNumberInstance(1, 'column')),
                {
                    type: 'math_change',
                    fields: {VAR: {name: 'column'}},
                    inputs: {DELTA: {shadow: numShadow(1)}},
                },
            ]),
        },
    },
};

const outerLoop: BlockDef[] = [
    setVar('row', 1),
    {
        type: 'controls_repeat',
        fields: {
            TIMES: 3,
        },
        inputs: {
            DO: {
                block: chainBlocks([
                    setVar('column', 1),
                    innerLoop,
                    {
                        type: 'math_change',
                        fields: {VAR: {name: 'row'}},
                        inputs: {DELTA: {shadow: numShadow(1)}},
                    },
                ]),
            },
        },
    }
];


export const plantGrid = {
    blocks: {
        languageVersion: 0,
        blocks: [processBlocks(outerLoop)]
    }
};
