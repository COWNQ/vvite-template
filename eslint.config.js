import antfu from '@antfu/eslint-config'

export default antfu(
  {
    ignores: [
      'public',
      'dist*',
    ],
  },
  {
    rules: {
      'eslint-comments/no-unlimited-disable': 'off',
      'curly': ['error', 'all'],
      'antfu/consistent-list-newline': 'off',
      // 'dot-notation': 'off',   //关闭 保存自动将xxx['sss']转换为xxx.sss
    },
  },
  {
    files: [
      'src/**/*.vue',
    ],
    rules: {
      'vue/component-tags-order': ['error', {
        order: ['route', 'i18n', 'script', 'template', 'style'],
      }],
    },
  },
)
