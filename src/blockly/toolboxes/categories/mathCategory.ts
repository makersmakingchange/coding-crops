export const mathCategoryContents = [
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
    {
        kind: 'label',
        text: 'Math Condition Blocks',
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
    }
]