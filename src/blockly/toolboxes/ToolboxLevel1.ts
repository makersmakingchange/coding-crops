// Level 1 Toolbox

export const ToolboxLevel1 = {
  kind: 'categoryToolbox',
  contents: [
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