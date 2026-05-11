/**
 * @license
 * Copyright 2026 Neil Squire Society - Makers Making Change
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from 'blockly';
import { Order } from 'blockly/javascript';

export const ariaBlock = Object.create(null);

ariaBlock['math_aria_number'] = function (
    block: Blockly.Block,
    generator: Blockly.CodeGenerator,) {
    const number = Number(block.getFieldValue('NUM'));
    const order = number >= 0 ? Order.ATOMIC : Order.UNARY_NEGATION;
    return [String(number), order];
};
