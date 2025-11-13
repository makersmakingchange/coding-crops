// Define blocks in json

import * as Blockly from 'blockly/core';

const plant = {
    'type': 'plant',
    'message0': 'plant 🌱 at row %1 column %2',
    'args0': [
        {
            'type': 'field_number',
            'name': 'ROW',
            'check': 'Number',
            'value': 1,
        },
        {
            'type': 'field_number',
            'name': 'COLUMN',
            'check': 'Number',
            'value': 1,
        }
    ],
    'previousStatement': null,
    'nextStatement': null,
    'colour': 120,
    'tooltip': 'Plant an emoji at specified coordinates',
    'helpUrl': ''
};


const harvest = {
    'type': 'harvest',
    'message0': 'harvest row %1 column %2',
    'args0': [
        {
            'type': 'field_number',
            'name': 'ROW',
            'check': 'Number',
            'value': 1,
        },
        {
            'type': 'field_number',
            'name': 'COLUMN',
            'check': 'Number',
            'value': 1,
        }
    ],
    'previousStatement': null,
    'nextStatement': null,
    'inline': true,
    'colour': 0,
    'tooltip': 'Remove plant at specified coordinates',
    'helpUrl': ''
};

const water = {
    'type': 'water',
    'message0': 'water row %1 column %2',
    'args0': [
        {
            'type': 'field_number',
            'name': 'ROW',
            'check': 'Number',
            'value': 1,
        },
        {
            'type': 'field_number',
            'name': 'COLUMN',
            'check': 'Number',
            'value': 1,
        }
    ],
    'previousStatement': null,
    'nextStatement': null,
    'colour': 210,
    'tooltip': 'Change tile color at specified coordinates',
    'helpUrl': ''
};

const next_day = {
    'type': 'next_day',
    'message0': 'next day',
    'previousStatement': null,
    'nextStatement': null,
    'colour': 60,
    'tooltip': 'Go to the next day',
    'helpUrl': ''
};

export const farmBlocks = Blockly.common.createBlockDefinitionsFromJsonArray([
    plant,
    harvest,
    water,
    next_day
]);
