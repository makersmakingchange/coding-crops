/**
 * @license
 * Copyright 2026 Neil Squire Society - Makers Making Change
 * SPDX-License-Identifier: Apache-2.0
 */

// Level 1 Toolbox

import {farmCategoryContents} from "./categories/farmCategory";

export const ToolboxLevel1 = {
    kind: 'categoryToolbox',
    contents: [
        {
            kind: 'category',
            name: 'Farm',
            colour: '#5CA699',
            contents: farmCategoryContents
        }
    ]
};