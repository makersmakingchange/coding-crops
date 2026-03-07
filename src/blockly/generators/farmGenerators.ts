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
    const row = generator.valueToCode(block, 'ROW', Order.ASSIGNMENT) || 1;
    const col = generator.valueToCode(block, 'COLUMN', Order.ASSIGNMENT) || 1;

    return `
        (function(row, col) {
            farmManager.enqueue(() => {
                farmManager.plant(row, col);
            });
        })(${row}, ${col});
    `;
};

forBlock['water'] = function (
    block: Blockly.Block,
    generator: Blockly.CodeGenerator,
) {
    const row = generator.valueToCode(block, 'ROW', Order.ASSIGNMENT) || 1;
    const col = generator.valueToCode(block, 'COLUMN', Order.ASSIGNMENT) || 1;

    return `
        (function(row, col) {
            farmManager.enqueue(() => {
                farmManager.water(row, col);
            });
        })(${row}, ${col});
    `;
};

forBlock['harvest'] = function (
    block: Blockly.Block,
    generator: Blockly.CodeGenerator,
) {
    const row = generator.valueToCode(block, 'ROW', Order.ASSIGNMENT) || 1;
    const col = generator.valueToCode(block, 'COLUMN', Order.ASSIGNMENT) || 1;

    return `
        (function(row, col) {
            farmManager.enqueue(() => {
                farmManager.harvest(row, col);
            });
        })(${row}, ${col});
    `;
};

forBlock['next_day'] = function () {
    return `farmManager.enqueueNextDay();\n`;
};

forBlock['begin_farm'] = function (
    block: Blockly.Block,
    generator: Blockly.CodeGenerator,
) {
    const statements = generator.statementToCode(block, 'STATEMENTS');
    return `${statements}`;
};