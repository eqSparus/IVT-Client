module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    indent: ['error', 2],
    'max-len': 'off',
    'linebreak-style': 0,
    'vuejs-accessibility/label-has-for': ['off', {
      required: {
        some: ['nesting', 'id'],
      },
    }],
    'vuejs-accessibility/form-control-has-label': 'off',
  },
};
