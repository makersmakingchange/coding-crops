import {javascriptGenerator, Order} from 'blockly/javascript';

javascriptGenerator.forBlock['plant'] = function(block, generator) {
    const x = Number(generator.valueToCode(block, 'X', javascriptGenerator.ORDER_ATOMIC)) - 1 || 0;
    const y = Number(generator.valueToCode(block, 'Y', javascriptGenerator.ORDER_ATOMIC)) - 1 || 0;

    if (![0, 1, 2].includes(x) || ![0, 1, 2].includes(y)) {
        throw new Error(`Invalid coordinates: (${x+1}, ${y+1}). Allowed values are 1, 2, or 3.`);
    }

    return `farmManager.enqueue(() => farmManager.plant(${x}, ${y}));\n`;
};

javascriptGenerator.forBlock['water'] = function(block, generator) {
    const x = Number(generator.valueToCode(block, 'X', javascriptGenerator.ORDER_ATOMIC)) - 1 || 0;
    const y = Number(generator.valueToCode(block, 'Y', javascriptGenerator.ORDER_ATOMIC)) - 1 || 0;

    if (![0, 1, 2].includes(x) || ![0, 1, 2].includes(y)) {
        throw new Error(`Invalid coordinates: (${x+1}, ${y+1}). Allowed values are 1, 2, or 3.`);
    }

    return `farmManager.enqueue(() => farmManager.water(${x}, ${y}));\n`;
};

javascriptGenerator.forBlock['harvest'] = function(block, generator) {
    const x = Number(generator.valueToCode(block, 'X', javascriptGenerator.ORDER_ATOMIC)) - 1 || 0;
    const y = Number(generator.valueToCode(block, 'Y', javascriptGenerator.ORDER_ATOMIC)) - 1 || 0;

    if (![0, 1, 2].includes(x) || ![0, 1, 2].includes(y)) {
        throw new Error(`Invalid coordinates: (${x+1}, ${y+1}). Allowed values are 1, 2, or 3.`);
    }

    return `farmManager.enqueue(() => farmManager.harvest(${x}, ${y}));\n`;

};

javascriptGenerator.forBlock['next_day'] = function(block) {
    return `farmManager.enqueue(() => farmManager.nextDay());\n`;
};