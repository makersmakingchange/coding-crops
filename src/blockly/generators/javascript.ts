/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import {Order} from 'blockly/javascript';
import * as Blockly from 'blockly/core';

// Export all the code generators for our custom blocks,
// but don't register them with Blockly yet.
// This file has no side effects!
export const forBlock = Object.create(null);

forBlock['add_text'] = function (
  block: Blockly.Block,
  generator: Blockly.CodeGenerator,
) {
  const text = generator.valueToCode(block, 'TEXT', Order.NONE) || "''";
  const addText = generator.provideFunction_(
    'addText',
    `function ${generator.FUNCTION_NAME_PLACEHOLDER_}(text) {

  // Add text to the output area.
  const outputDiv = document.getElementById('output');
  const textEl = document.createElement('p');
  textEl.innerText = text;
  outputDiv.appendChild(textEl);
}`,
  );
  // Generate the function call for this block.
  const code = `${addText}(${text});\n`;
  return code;
};

forBlock['plant'] = function (
    block: Blockly.Block,
    generator: Blockly.CodeGenerator,
) {
    const x = Number(generator.valueToCode(block, 'X', Order.SUBTRACTION)) - 1 || 0;
    const y = Number(generator.valueToCode(block, 'Y', Order.SUBTRACTION)) - 1 || 0;

    if (![0, 1, 2].includes(x) || ![0, 1, 2].includes(y)) {
        throw new Error(`Invalid coordinates: (${x+1}, ${y+1}). Allowed values are 1, 2, or 3.`);
    }

    return `farmManager.enqueue(() => farmManager.plant(${x}, ${y}));\n`;
};

forBlock['water'] = function (
    block: Blockly.Block,
    generator: Blockly.CodeGenerator,
) {
    const x = Number(generator.valueToCode(block, 'X', Order.SUBTRACTION)) - 1 || 0;
    const y = Number(generator.valueToCode(block, 'Y', Order.SUBTRACTION)) - 1 || 0;

    if (![0, 1, 2].includes(x) || ![0, 1, 2].includes(y)) {
        throw new Error(`Invalid coordinates: (${x+1}, ${y+1}). Allowed values are 1, 2, or 3.`);
    }

    return `farmManager.enqueue(() => farmManager.water(${x}, ${y}));\n`;
};

forBlock['harvest'] = function (
    block: Blockly.Block,
    generator: Blockly.CodeGenerator,
) {
    const x = Number(generator.valueToCode(block, 'X', Order.SUBTRACTION)) - 1 || 0;
    const y = Number(generator.valueToCode(block, 'Y', Order.SUBTRACTION)) - 1 || 0;

    if (![0, 1, 2].includes(x) || ![0, 1, 2].includes(y)) {
        throw new Error(`Invalid coordinates: (${x+1}, ${y+1}). Allowed values are 1, 2, or 3.`);
    }

    return `farmManager.enqueue(() => farmManager.harvest(${x}, ${y}));\n`;
};

forBlock['next_day'] = function (
    block: Blockly.Block,
    generator: Blockly.CodeGenerator,
) {
    return `farmManager.enqueue(() => farmManager.nextDay());\n`;
};
