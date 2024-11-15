const OFF = 0
const WARN = 1
const ERROR = 2

module.exports = {
  'env': {
    'es2020': true
  },
  'rules': {

    // 强制注释后必须有个空格
    'spaced-comment': OFF,

    // 强制圆括号内没有空格
    'space-in-parens': OFF,

    // 要求或禁止使用拖尾逗号
    'comma-dangle': [
      OFF,
      {
        'arrays':  'never',   // 数组不允许最后一位出现逗号
        'objects': 'never'    // 对象不允许最后一位出现逗号
      }
    ],

    // 每个文件的class最多能有3个
    'max-classes-per-file': [ OFF, 10 ],

    // 对象空格
    'object-curly-spacing': [ OFF, 'always' ],

    // 必须使用单引号
    'quotes': [ OFF, 'single' ],

    // 结尾不能加上分号
    'semi': [ OFF, 'never' ],

    // 设置代码缩进为2
    'indent': [ OFF, 2, { 'SwitchCase': 1 } ],

    // 类成员之间需要有空行, 单行类成员不需要换行
    'lines-between-class-members': [
      OFF,
      'always',
      {
        exceptAfterSingleLine: true
      }
    ],

    // 一个文件最多可以有多少行
    'max-lines': [ OFF, {
      max:            500,    // 最多300
      skipBlankLines: true,   // 忽略空白行
      skipComments:   true    // 忽略注释行
    } ],

    // 不能出现连续2行空行
    'no-multiple-empty-lines': [ OFF, { max: 1 } ],

    // 强制函数最大代码行数
    'max-lines-per-function': [
      OFF, {
        max:            250,    // 最大250行
        skipBlankLines: true,   // 忽略空白行
        skipComments:   true    // 忽略注释行
      }
    ],

    // 强制函数定义中最多允许的参数数量
    'max-params': [ OFF, { max: 6 } ],

    // 数组 前后都要加空格
    'array-bracket-spacing': [ OFF, 'always' ],

    // 对象风格
    'key-spacing': [
      OFF, {
        beforeColon: false,     //  冒号之前不存在一个空格
        afterColon:  true,      //  冒号之后存在一个空格
        mode:        'minimum',
        align:       'value'
      }
    ],

    // 强制关键字周围空格的一致性
    'keyword-spacing': [ OFF, { 'before': true, 'after': true } ],

    // 强制在代码块中开括号前和闭括号后有空格
    'block-spacing': [ OFF, 'always' ],

    // 禁止出现空函数
    // 'no-empty-function': OFF,

    // 禁止使用不带 await 表达式的 async 函数
    // 'require-await': OFF,

    // 要求或禁止在函数标识符和其调用之间有空格
    'func-call-spacing': [ OFF, 'never' ],

    // 强制在逗号周围使用空格
    'comma-spacing': [ OFF, { 'before': false, 'after': true } ],

    // 强制在 JSX 属性中使用一致的单引号
    'jsx-quotes': [ OFF, 'prefer-single' ],

    // 禁用不必要的构造函数
    // 'no-useless-constructor': OFF,

    // 禁用 Alert
    'no-alert': OFF,

    // 禁用 var
    'no-var': OFF,

    // no-console
    'no-console': OFF,

    // 要求中缀操作符周围有空格
    'space-infix-ops': OFF
  },
  'parserOptions': {
    'sourceType':  'module',
    'ecmaFeature': {
      'jsx': true
    }
  },
  ignorePatterns: [
    '*.svg',
    '*.json',
    '*.eot',
    '*.css',
    '*.html',
    '*.ttf',
    '*.woff',
    '*.woff2'
  ],
  parser: '@typescript-eslint/parser'
}