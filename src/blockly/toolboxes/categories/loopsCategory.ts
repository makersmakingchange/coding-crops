export const loopsCategoryContents = [
    {
        kind: 'block',
        type: 'controls_repeat_ext',
        inputs: {
            TIMES: {
                shadow: {
                    type: 'math_number',
                    fields: {NUM: 10}
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