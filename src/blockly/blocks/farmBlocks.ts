/**
 * @license
 * Copyright 2026 Neil Squire Society - Makers Making Change
 * SPDX-License-Identifier: Apache-2.0
 */

// Define blocks in json

import * as Blockly from 'blockly';

const plant = {
    type: 'plant',
    message0: 'plant 🌱 at row %1 column %2',
    args0: [
        {
            type: 'input_value',
            name: 'ROW',
            check: 'Number',
            min: 1,
            max: 3,
        },
        {
            type: 'input_value',
            name: 'COLUMN',
            check: 'Number',
            min: 1,
            max: 3,
        }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 120,
    tooltip: 'Plant a seedling at specified coordinates',
    helpUrl: ''
};

const harvest = {
    type: 'harvest',
    message0: 'harvest row %1 column %2',
    args0: [
        {
            type: 'input_value',
            name: 'ROW',
            check: 'Number',
        },
        {
            type: 'input_value',
            name: 'COLUMN',
            check: 'Number',
        }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 0,
    tooltip: 'Remove plant at specified coordinates',
    helpUrl: ''
};

const water = {
    type: 'water',
    message0: 'water row %1 column %2',
    args0: [
        {
            type: 'input_value',
            name: 'ROW',
            check: 'Number',
        },
        {
            type: 'input_value',
            name: 'COLUMN',
            check: 'Number',
        }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 210,
    tooltip: 'Water plant at specified coordinates',
    helpUrl: ''
};

const next_day = {
    type: 'next_day',
    message0: 'next day',
    previousStatement: null,
    nextStatement: null,
    colour: '#D1A600',
    tooltip: 'Go to the next day',
    helpUrl: ''
};

const begin_farm = {
    type: 'begin_farm',
    message0: 'begin %1',
    args0: [
        {
            type: 'input_statement',
            name: 'STATEMENTS'
        }
    ],
    colour: '#793e02',
    tooltip: 'Setup the farm',
    helpUrl: ''
};

// Register all blocks
export const farmBlocks = Blockly.common.createBlockDefinitionsFromJsonArray([
    plant,
    harvest,
    water,
    next_day,
    begin_farm
]);