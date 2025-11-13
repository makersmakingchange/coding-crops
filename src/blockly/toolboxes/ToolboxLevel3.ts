// Level 3 Toolbox

import {farmCategoryContents} from "./categories/farmCategory";

export const ToolboxLevel3 = {
    kind: 'categoryToolbox',
    contents: [
        {
            kind: 'category',
            name: 'Logic Center (TBD)',
            categorystyle: 'loop_category',
            contents: [
                {
                    kind: 'block',
                    type: 'controls_ifelse'
                },
                {
                    kind: 'block',
                    type: 'logic_compare',
                    fields: {
                         OP: 'EQ'
                     }
                },
                {
                    kind: 'block',
                    type: 'logic_operation',
                    fields: {
                        OP: 'AND'
                    }
                },
                {
                    kind: 'block',
                    type: 'logic_negate',
                },
                {
                    kind: 'block',
                    type: 'logic_boolean',
                    fields: {
                        BOOL: 'TRUE'
                    }
                },
                {
                    kind: 'block',
                    type: 'controls_repeat_ext',
                    inputs: {
                        TIMES: {
                            shadow: {
                                type: 'math_number',
                                fields: { NUM: 10 }
                            }
                        }
                    }
                },
                {
                    kind: 'block',
                    type: 'math_number',
                }
            ]
        },
        {
            kind: 'category',
            name: 'Variables',
            custom: 'VARIABLE',
            categorystyle: 'variable_category'
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