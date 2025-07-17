/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard-scss'],
  plugins: ['stylelint-order'],
  customSyntax: 'postcss-scss',
  rules: {
    // 1. 配置内容顺序：先自定义属性，再普通声明等 :contentReference[oaicite:2]{index=2}
    'order/order': [
      'custom-properties',
      'dollar-variables',
      'declarations',
      'at-rules',
    ],

    // 2. 配置属性顺序：可以直接按列表或分组定义
    'order/properties-order': [
      [
        'position',
        'top',
        'right',
        'bottom',
        'left',
        'z-index',
        {
          emptyLineBefore: 'always',
          properties: [
            'display',
            'flex-direction',
            'justify-content',
            'align-items',
          ],
        },
        {
          emptyLineBefore: 'always',
          properties: ['width', 'height', 'margin', 'padding'],
        },
        {
          emptyLineBefore: 'always',
          properties: ['font-size', 'color', 'background'],
        },
      ],
      {
        unspecified: 'bottom',
        severity: 'warning',
      },
    ],
  },
};
