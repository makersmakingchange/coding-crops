/**
 * @license
 *
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Define custom blocks.
 * @author samelh@google.com (Sam El-Husseini)
 */

// Define blocks in json

import * as Blockly from 'blockly/core';

const plant = {
    'type': 'plant',
    'message0': 'plant 🌱 at row : %1 col: %2',
    'args0': [
        {
            'type': 'input_value',
            'name': 'X',
            'check': 'Number'
        },
        {
            'type': 'input_value',
            'name': 'Y',
            'check': 'Number'
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
    'message0': 'harvest at row: %1 col: %2',
    'args0': [
        {
            'type': 'input_value',
            'name': 'X',
            'check': 'Number'
        },
        {
            'type': 'input_value',
            'name': 'Y',
            'check': 'Number'
        }
    ],
    'previousStatement': null,
    'nextStatement': null,
    'colour': 0,
    'tooltip': 'Remove plant at specified coordinates',
    'helpUrl': ''
};

const water = {
    'type': 'water',
    'message0': 'water tile at row: %1 col: %2',
    'args0': [
        {
            'type': 'input_value',
            'name': 'X',
            'check': 'Number'
        },
        {
            'type': 'input_value',
            'name': 'Y',
            'check': 'Number'
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
