// Level 1 Toolbox

export const ToolboxLevel1 = {
  kind: 'categoryToolbox',
  contents: [
    {
      kind: 'category',
      name: 'Farm',
      colour: '#5CA699',
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