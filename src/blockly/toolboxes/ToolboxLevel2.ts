// Level 2 Toolbox

export const ToolboxLevel2 = {
    kind: 'categoryToolbox',
    contents: [
        {
            kind: 'category',
            name: 'Logic Center (TBD)',
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
            categorystyle: 'text_category',
            contents: [
                {
                    kind: 'block',
                    type: 'plant',
                    inline: true,
                    inputs: {
                        X: {
                            shadow: {
                                type: 'math_number',
                                fields: { NUM: 1 }
                            }
                        },
                        Y: {
                            shadow: {
                                type: 'math_number',
                                fields: { NUM: 1 }
                            }
                        }
                    }
                },
                {
                    kind: 'block',
                    type: 'water',
                    inline: true,
                    inputs: {
                        X: {
                            shadow: {
                                type: 'math_number',
                                fields: { NUM: 1 }
                            }
                        },
                        Y: {
                            shadow: {
                                type: 'math_number',
                                fields: { NUM: 1 }
                            }
                        }
                    }
                },
                {
                    kind: 'block',
                    type: 'harvest',
                    inline: true,
                    inputs: {
                        X: {
                            shadow: {
                                type: 'math_number',
                                fields: { NUM: 1 }
                            }
                        },
                        Y: {
                            shadow: {
                                type: 'math_number',
                                fields: { NUM: 1 }
                            }
                        }
                    }
                },
                {
                    kind: 'block',
                    type: 'next_day'
                }
            ]
        }
    ]
};