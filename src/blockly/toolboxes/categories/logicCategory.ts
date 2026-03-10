export const logicCategoryContents = [

    {
        type: 'controls_if',
        kind: 'block',
        id: 'if_block',
    },
    {
        kind: 'label',
        text: 'Condition Blocks',
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

]