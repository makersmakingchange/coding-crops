// Level 3 Toolbox

import {farmCategoryContents} from "./categories/farmCategory";

export const ToolboxLevel3 = {
    kind: 'categoryToolbox',
    contents: [
        {
            kind: 'category',
            name: 'Logic Center',
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
                    type: 'controls_whileUntil',
                    kind: 'block',
                    fields: {
                        MODE: 'WHILE',
                    },
                },
                {
                    type: 'controls_for',
                    kind: 'block',
                    fields: {
                        VAR: {
                            name: 'i',
                        },
                    },
                    inputs: {
                        FROM: {
                            shadow: {
                                type: 'math_number',
                                fields: {
                                    NUM: 1,
                                },
                            },
                        },
                        TO: {
                            shadow: {
                                type: 'math_number',
                                fields: {
                                    NUM: 10,
                                },
                            },
                        },
                        BY: {
                            shadow: {
                                type: 'math_number',
                                fields: {
                                    NUM: 1,
                                },
                            },
                        },
                    },
                },
                {
                    type: 'controls_flow_statements',
                    kind: 'block',
                    enabled: true,
                    fields: {
                        FLOW: 'BREAK',
                    },
                },
            ]
        },
        {
            kind: 'category',
            name: 'Math',
            categorystyle: 'math_category',
            contents: [
                {
                    type: 'math_number',
                    kind: 'block',
                    fields: {
                        NUM: 123,
                    },
                },
                {
                    type: 'math_arithmetic',
                    kind: 'block',
                    fields: {
                        OP: 'ADD',
                    },
                    inputs: {
                        A: {
                            shadow: {
                                type: 'math_number',
                                fields: {
                                    NUM: 1,
                                },
                            },
                        },
                        B: {
                            shadow: {
                                type: 'math_number',
                                fields: {
                                    NUM: 1,
                                },
                            },
                        },
                    },
                },
                {
                    type: 'math_number_property',
                    kind: 'block',
                    fields: {
                        PROPERTY: 'EVEN',
                    },
                    inputs: {
                        NUMBER_TO_CHECK: {
                            shadow: {
                                type: 'math_number',
                                fields: {
                                    NUM: 0,
                                },
                            },
                        },
                    },
                },
                {
                    type: 'math_round',
                    kind: 'block',
                    fields: {
                        OP: 'ROUND',
                    },
                    inputs: {
                        NUM: {
                            shadow: {
                                type: 'math_number',
                                fields: {
                                    NUM: 3.1,
                                },
                            },
                        },
                    },
                },
                {
                    type: 'math_modulo',
                    kind: 'block',
                    inputs: {
                        DIVIDEND: {
                            shadow: {
                                type: 'math_number',
                                fields: {
                                    NUM: 64,
                                },
                            },
                        },
                        DIVISOR: {
                            shadow: {
                                type: 'math_number',
                                fields: {
                                    NUM: 10,
                                },
                            },
                        },
                    },
                },
                {
                    type: 'math_random_int',
                    kind: 'block',
                    inputs: {
                        FROM: {
                            shadow: {
                                type: 'math_number',
                                fields: {
                                    NUM: 1,
                                },
                            },
                        },
                        TO: {
                            shadow: {
                                type: 'math_number',
                                fields: {
                                    NUM: 100,
                                },
                            },
                        },
                    },
                },
            ],
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