module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended' // or 'plugin:vue/base'
  ],
  env: {
    "node": true
  },
  rules: {
    "no-console": 0,
    "vue/require-v-for-key": 0,
    'linebreak-style': ["error", "unix"],
    'default-case': 2,
    'no-var': 2,
    'no-alert': 2,
    'no-empty-function': 2,
    'no-caller': 2,
    'no-eval': 2,
    'no-floating-decimal': 2,
    'no-new-func': 2,
    'no-new-wrappers': 2,
    'no-param-reassign': 2,
    'no-return-assign': 2,
    'no-unmodified-loop-condition': 2,
    'no-unused-expressions': 2,
    'no-useless-call': 2,
    'no-useless-escape': 2,
    'no-with': 2,
    'no-shadow': 2,
    'no-shadow-restricted-names': 2,
    'no-use-before-define': 2,
    // 'camelcase': 2,
    'comma-dangle': 2,
    'no-array-constructor': 2,
    // 'no-bitwise': 2,
    'no-multi-assign': 2,
    'no-tabs': 2,
    'quotes': [2, 'single', {
      'avoidEscape': true,
      'allowTemplateLiterals': true
    }],
    'semi': [2, 'never'],
    'no-duplicate-imports': 2,
    'no-extra-parens': [2, 'all', {
      "nestedBinaryExpressions": false
    }],
    'getter-return': 2,
    'accessor-pairs': 2,
    'block-spacing': 2,
    'brace-style': 2,
    'new-parens': 2,
    'no-extend-native': 2,
    'no-extra-bind': 2,
    'no-proto': 2,
    'no-trailing-spaces': 2,
    'wrap-iife': [2, 'any'],
    'prefer-const': 2,
    'yield-star-spacing': [2, 'both'],
    'no-new-object': 2,
    'no-new-require': 2,
    'no-iterator': 2,
    'no-octal-escape': 2,
    'func-call-spacing': 2,
    'no-implied-eval': 2,
    'no-path-concat': 2,
    'no-useless-computed-key': 2,
    'space-infix-ops': 2,
    'yoda': [2, 'never'],
    'no-unused-vars': [2, {
      'vars': 'all',
      'args': 'none'
    }],
    'eol-last': 2,
    'space-before-blocks': 2,
    'no-self-compare': 2,
    'no-lone-blocks': 2,
    'no-multi-spaces': 2,
    'no-multi-str': 2,
    'no-sequences': 2,
    'no-useless-constructor': 2,
    'no-throw-literal': 2,
    'no-unneeded-ternary': [2, {
      'defaultAssignment': false
    }],
    'no-label-var': 2,
    'no-whitespace-before-property': 2,
    'array-bracket-spacing': 2,
    'dot-location': [2, 'property'],
    'no-multiple-empty-lines': [2, {
      'max': 1
    }],
    'one-var': [2, {
      'initialized': 'never'
    }],
    'no-labels': 2,
    'padded-blocks': [2, 'never'],
    'template-curly-spacing': 2,
    'comma-style': 2,
    'curly': 2,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'object-curly-spacing': [2, 'always', {
      objectsInObjects: false
    }],
    'keyword-spacing': 2,
    'arrow-spacing': 2,
    'comma-spacing': 2,
    'eqeqeq': 2,
    'space-unary-ops': [2, {
      'words': true,
      'nonwords': false
    }],
    'generator-star-spacing': 2,
    'handle-callback-err': [2, '^(err|error)$'],
    'key-spacing': 2,
    // 'new-cap': 2,
    'operator-linebreak': 2,
    'spaced-comment': [2, 'always', {
      'markers': ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ',']
    }],
    'jsx-quotes': [2, 'prefer-single'],
    'vue/jsx-uses-vars': 2
  }
}
