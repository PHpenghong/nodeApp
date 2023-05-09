module.exports = {
  root: true,
  env: {
    node: true,
    commonjs: true,
    es2021: true
  },
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  rules: {
    'prettier/prettier': 'error',

    // 箭头体样式
    'arrow-body-style': 'error',

    // 读取未定义属性
    'no-undef': 'error',

    // 已定义未读取
    'no-unused-vars': 'error',

    // 注释符号直接要有间隙
    'spaced-comment': 'error',

    'no-console': 'warn',

    // let -> const
    'prefer-const': 'error',

    // str + var -> `str${var}
    'prefer-template': 'error',

    'dot-notation': 'error',

    'array-callback-return': 'error',

    'no-restricted-syntax': [
      'error',
      {
        selector: 'ImportDeclaration',
        message:
          'ES modules are forbidden in this project. Use CommonJS instead.'
      },
      {
        selector: 'ExportDefaultDeclaration',
        message:
          'ES modules are forbidden in this project. Use CommonJS instead.'
      },
      {
        selector:
          'ExportNamedDeclaration:not([declaration.type="VariableDeclaration"])',
        message:
          'ES modules are forbidden in this project. Use CommonJS instead.'
      }
    ]
  }
}
