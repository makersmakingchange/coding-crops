// Level 2 Toolbox

import {farmCategoryContents} from "./categories/farmCategory";

export const ToolboxLevel2 = {
    kind: 'categoryToolbox',
    contents: [
        {
            kind: 'category',
            name: 'Logic Center',
            categorystyle: 'loop_category',
            contents: [
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
                    type: 'controls_ifelse'
                },
                {
                    type: 'logic_compare',
                    kind: 'block',
                    fields: {
                        OP: 'EQ',
                    },
                },
                {
                    type: 'logic_operation',
                    kind: 'block',
                    fields: {
                        OP: 'AND',
                    },
                },
                {
                    type: 'logic_negate',
                    kind: 'block',
                },
                {
                    type: 'logic_boolean',
                    kind: 'block',
                    fields: {
                        BOOL: 'TRUE',
                    },
                },
                {
                    type: 'logic_null',
                    kind: 'block',
                    enabled: true,
                },
                {
                    type: 'math_number',
                    kind: 'block',
                    fields: {
                        NUM: 123,
                    },
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