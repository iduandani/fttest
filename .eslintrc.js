module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "no-trailing-spaces": 2, //一行最后不允许有空格
    "eol-last": 2, //文件以换行符结束
    "no-extra-semi": 2, //不允许出现不必要的分号
    "space-infix-ops": [2, {"int32Hint": true}], //操作符周围的空格
    "key-spacing": [2, {"beforeColon": false, "afterColon": true}], //对象字面量中冒号的前后空格
    "quotes": [1, "single", "avoid-escape"], //引号风格
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
