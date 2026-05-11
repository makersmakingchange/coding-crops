/**
 * @license
 * Copyright 2026 Neil Squire Society - Makers Making Change
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from 'blockly';
import FarmFieldNumber from "../fields/FarmFieldNumber";
import {announceDynamicAriaState} from "blockly/core/utils/aria";
import A11yAnnouncer from "../../accessibility/A11yAnnouncer";

Blockly.Blocks['math_aria_number'] = {
    init: function () {
        const field = new FarmFieldNumber(1, 1, 3, null, null, {
            ariaTypeName: 'Number',
        });

        this.appendDummyInput().appendField(field, 'NUM');
        this.setOutput(true, 'Number');
        this.setStyle('math_blocks');
    },

    saveExtraState() {
        return {
            ariaTypeName: this.getField('NUM')?.ariaTypeName,
            value: this.getFieldValue('NUM'),
        };
    },

    loadExtraState(state: any) {
        const field = this.getField('NUM');
        if (field) {
            field.ariaTypeName = state.ariaTypeName || 'default';
            field.setValue(state.value ?? 1);
        }
    },
};

export function createAriaNumberInstance(value: number, ariaTypeName: string) {
    return {
        type: 'math_aria_number',
        fields: {
            NUM: value,
        },
        extraState: {
            value,
            ariaTypeName,
        },
    };
}