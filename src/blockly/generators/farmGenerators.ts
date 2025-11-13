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
) {
    const row = (block.getFieldValue('ROW') - 1) || 0;
    const col = (block.getFieldValue('COLUMN') - 1) || 0;

    if (![0, 1, 2].includes(row) || ![0, 1, 2].includes(col)) {
        throw new Error(`Invalid coordinates: (${row+1}, ${col+1}). Allowed values are 1, 2, or 3.`);
    }

    return `farmManager.enqueue(() => farmManager.plant(${row}, ${col}));\n`;
};

forBlock['water'] = function (
    block: Blockly.Block,
) {
    const row = (block.getFieldValue('ROW') - 1) || 0;
    const col = (block.getFieldValue('COLUMN') - 1) || 0;

    if (![0, 1, 2].includes(row) || ![0, 1, 2].includes(col)) {
        throw new Error(`Invalid coordinates: (${row+1}, ${col+1}). Allowed values are 1, 2, or 3.`);
    }

    return `farmManager.enqueue(() => farmManager.water(${row}, ${col}));\n`;
};

forBlock['harvest'] = function (
    block: Blockly.Block,
) {
    const row = (block.getFieldValue('ROW') - 1) || 0;
    const col = (block.getFieldValue('COLUMN') - 1) || 0;

    if (![0, 1, 2].includes(row) || ![0, 1, 2].includes(col)) {
        throw new Error(`Invalid coordinates: (${row+1}, ${col+1}). Allowed values are 1, 2, or 3.`);
    }

    return `farmManager.enqueue(() => farmManager.harvest(${row}, ${col}));\n`;
};

forBlock['next_day'] = function () {
    return `farmManager.enqueueNextDay();\n`;
};
