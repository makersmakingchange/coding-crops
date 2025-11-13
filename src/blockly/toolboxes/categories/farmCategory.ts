export const farmCategoryContents = [
    {
        kind: 'block',
        type: 'plant',
        inline: true,
        fields: {
            ROW: 1,
            COLUMN: 1,
        },
    },
    {
        kind: 'block',
        type: 'water',
        inline: true,
        fields: {
            ROW: 1,
            COLUMN: 1,
        },
    },
    {
        kind: 'block',
        type: 'harvest',
        inline: true,
        fields: {
            ROW: 1,
            COLUMN: 1,
        },
    },
    {
        kind: 'block',
        type: 'next_day'
    }
]

export const farmToolbox = {
    'kind': 'flyoutToolbox',
    'contents': farmCategoryContents,
};
