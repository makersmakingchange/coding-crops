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
 * @fileoverview Define generation methods for custom blocks.
 * @author samelh@google.com (Sam El-Husseini)
 */

// More on generating code:
// https://developers.google.com/blockly/guides/create-custom-blocks/generating-code

import {javascriptGenerator, Order} from 'blockly/javascript';

javascriptGenerator.forBlock['plant'] = function(block, generator) {
    const x = Number(generator.valueToCode(block, 'X', Order.SUBTRACTION)) - 1 || 0;
    const y = Number(generator.valueToCode(block, 'Y', Order.SUBTRACTION)) - 1 || 0;

    if (![0, 1, 2].includes(x) || ![0, 1, 2].includes(y)) {
        throw new Error(`Invalid coordinates: (${x+1}, ${y+1}). Allowed values are 1, 2, or 3.`);
    }

    return `farmManager.plant(${x}, ${y});\n`;
};

javascriptGenerator.forBlock['water'] = function(block, generator) {
    const x = Number(generator.valueToCode(block, 'X', Order.SUBTRACTION)) - 1 || 0;
    const y = Number(generator.valueToCode(block, 'Y', Order.SUBTRACTION)) - 1 || 0;

    if (![0, 1, 2].includes(x) || ![0, 1, 2].includes(y)) {
        throw new Error(`Invalid coordinates: (${x+1}, ${y+1}). Allowed values are 1, 2, or 3.`);
    }

    return `farmManager.water(${x}, ${y});\n`;
};

javascriptGenerator.forBlock['harvest'] = function(block, generator) {
    const x = Number(generator.valueToCode(block, 'X', Order.SUBTRACTION)) - 1 || 0;
    const y = Number(generator.valueToCode(block, 'Y', Order.SUBTRACTION)) - 1 || 0;

    if (![0, 1, 2].includes(x) || ![0, 1, 2].includes(y)) {
        throw new Error(`Invalid coordinates: (${x+1}, ${y+1}). Allowed values are 1, 2, or 3.`);
    }

    return `farmManager.harvest(${x}, ${y});\n`;

};

javascriptGenerator.forBlock['next_day'] = function(block) {
    return `farmManager.nextDay();\n`;
};