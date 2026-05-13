/**
 * @license
 * Copyright 2026 Neil Squire Society - Makers Making Change
 * SPDX-License-Identifier: Apache-2.0
 */

// Level 3 Toolbox

import {farmCategoryContents} from "./categories/farmCategory";
import {logicCategoryContents} from "./categories/logicCategory";
import {loopsCategoryContents} from "./categories/loopsCategory";
import {mathCategoryContents} from "./categories/mathCategory";

export const ToolboxLevel3 = {
    kind: 'categoryToolbox',
    contents: [
        {
            kind: 'category',
            name: 'Logic',
            categorystyle: 'logic_category',
            contents: logicCategoryContents
        },
        {
            kind: 'category',
            name: 'Loops',
            categorystyle: 'loop_category',
            contents: loopsCategoryContents
        },
        {
            kind: 'category',
            name: 'Math',
            categorystyle: 'math_category',
            contents: mathCategoryContents
        },
        {
            kind: 'category',
            name: 'Variables',
            custom: 'VARIABLE',
            categorystyle: 'variable_category'
        },
        {
            kind: 'category',
            name: 'Functions',
            custom: 'PROCEDURE',
            categorystyle: 'procedure_category',
        },
        {
            kind: 'sep',
            gap: 8
        },
        {
            kind: 'category',
            name: 'Farm',
            colour: '#5CA699',
            contents: farmCategoryContents
        }
    ]
};