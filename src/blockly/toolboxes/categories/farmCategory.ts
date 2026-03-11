import {createAriaNumberInstance} from "../../blocks/mathBlocks";

export const farmCategoryContents = [
    {
        kind: 'block',
        type: 'plant',
        inline: true,
        inputs: {
            ROW: {
                shadow: {
                    type: 'math_number',
                    fields: {
                        NUM: 1
                    },
                }
            },
            COLUMN: {
                shadow: {
                    type: 'math_number',
                    fields: {
                        NUM: 1
                    },
                }
            }
        }
    },
    {
        kind: 'block',
        type: 'water',
        inline: true,
        inputs: {
            ROW: {
                shadow: {
                    type: 'math_number',
                    fields: {
                        NUM: 1
                    },
                }
            },
            COLUMN: {
                shadow: {
                    type: 'math_number',
                    fields: {
                        NUM: 1
                    },
                }
            }
        }
    },
    {
        kind: 'block',
        type: 'harvest',
        inline: true,
        inputs: {
            ROW: {
                shadow: {
                    type: 'math_number',
                    fields: {
                        NUM: 1
                    },
                }
            },
            COLUMN: {
                shadow: {
                    type: 'math_number',
                    fields: {
                        NUM: 1
                    },
                }
            }
        }
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
