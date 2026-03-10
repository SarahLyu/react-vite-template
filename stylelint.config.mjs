/** @type {import('stylelint').Config} */
export default {
  customSyntax: 'postcss-scss',
  plugins: ['stylelint-prettier', 'stylelint-order'],
  extends: ['stylelint-config-standard-scss', 'stylelint-config-idiomatic-order'],
  rules: {
    'alpha-value-notation': 'number',
    'scss/at-rule-no-unknown': [true, { ignoreAtRules: ['include', 'mixin', 'use'] }],
    'color-function-alias-notation': null,
    'color-function-notation': 'legacy',
    'declaration-block-no-duplicate-properties': true,
    // 'declaration-no-important': true,
    'import-notation': null,
    'length-zero-no-unit': true,
    'max-nesting-depth': 5,
    'no-descending-specificity': null,
    'rule-empty-line-before': ['always', { ignore: ['after-comment', 'first-nested'] }],
    'selector-class-pattern': [
      '^[a-zA-Z0-9_-]+$',
      { message: '类名只能包含字母、数字、下划线和短横线' },
    ],
    'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['global'] }],
    'prettier/prettier': true,
  },
};
