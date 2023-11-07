# 前端框架de搭建

web应用程序构建工具：vite

<aside>
💡 使用注意
1. 遵循 `bem` 命名规则
2. 建议开启 **[`Volar Takeover 模式`](https://cn.vuejs.org/guide/typescript/overview.html#volar-takeover-mode)**
3.  `.vscode文件夹`结构分析

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/80bbc51a-3738-44e1-ab8d-c328609bf9e6/d3f31add-fd4e-4bee-8b9d-e8df0a9de919/Untitled.png)

</aside>

# 介绍

- 项目所使用库
    - [vue](https://cn.vuejs.org/guide/introduction.html)
    - [vue-router](https://router.vuejs.org/zh/introduction.html)
    - [pinia](https://pinia.vuejs.org/zh/introduction.html)（ 状态管理库）
        
        ```
        import { defineStore } from 'pinia'
        import { ref } from 'vue'
        
        // 在 Setup Store 中：
        // ref() 就是 state 属性
        // computed() 就是 getters
        // function() 就是 actions
        const useTemplateStore = defineStore('template', () => {
          const project_id = ref(123124)
        
          return { project_id }
        })
        
        export default useTemplateStore
        ```
        
        ```
        import { storeToRefs } from 'pinia'    //用这个结构可让数据保持响应性
        const { project_id } = storeToRefs(store)
        ```
        
    - [axios](https://www.axios-http.cn/docs/intro) （网络请求库）
    - [dayjs](https://dayjs.gitee.io/docs/zh-CN/installation/installation)
    - [echarts](https://echarts.apache.org/examples/zh/index.html)
    - [element-plus](https://element-plus.org/zh-CN/guide/quickstart.html#%E6%8C%89%E9%9C%80%E5%AF%BC%E5%85%A5)
    - [layer-vue](http://www.layui-vue.com/zh-CN/guide/getStarted)
    - [mitt](https://www.npmjs.com/package/mitt) （ 进行组件通信  ）
    - mockjs
    - [nprogress](https://github.com/rstacruz/nprogress) （网站加载进度条）
        
        <aside>
        💡 vue**怎么使用最佳？**
        将`NProgress.start()`放在全局路由守卫`beforeEach` 当中；
        将`NProgress.done()` 放在全局路由守卫`afterEach` 当中；
        这样，路由每变化一次上方的都将会出现加载ajax动画
        
        ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/80bbc51a-3738-44e1-ab8d-c328609bf9e6/afb45c45-f60b-4de2-b986-3e5eef87bcd4/Untitled.png)
        
        </aside>
        
    - [qs](https://www.npmjs.com/package/qs)
    - [js-cookie](https://www.npmjs.com/package/js-cookie)
- 使用的vite插件
- 常用命令
    - git
        
        ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/80bbc51a-3738-44e1-ab8d-c328609bf9e6/83ac3abb-8551-4c99-b2c6-0053c134fa04/Untitled.png)
        

# 配置相关

## **必配**

- [tsconfig.json](https://www.typescriptlang.org/zh/tsconfig#compilerOptions)
    
    ```jsx
    {
      "compilerOptions": {
        "target": "ESNext",
        "jsx": "preserve",
        "lib": [
          "ESNext",
          "DOM",
          "DOM.Iterable"
        ],
        "useDefineForClassFields": true,
        "baseUrl": "./",
        "module": "ESNext",
        "moduleResolution": "Bundler",
        "paths": {
          "@/*": [
            "src/*"
          ],
          "#/*": [
            "src/types/*"
          ]
        },
        "resolveJsonModule": true,
        "types": [
          "vite/client",
          "vite-plugin-pages/client",
          "vite-plugin-vue-meta-layouts/client"
        ],
        "allowImportingTsExtensions": true,
        "allowJs": false,
        "strict": true,
        "exactOptionalPropertyTypes": true, // 可选值不可为undefined
        "noImplicitAny": true, // 注释参数类型
        "noImplicitReturns": true, // 检查函数中的所有代码路径以确保它们返回值
        "noPropertyAccessFromIndexSignature": true,
        "noEmit": true,
        "sourceMap": true,
        "esModuleInterop": true,
        "isolatedModules": true,
        "skipLibCheck": true
    
      },
      "references": [
        {
          "path": "./tsconfig.node.json"
        }
      ],
      "include": [
        "src/**/*.ts",
        "src/**/*.d.ts",
        "src/**/*.tsx",
        "src/**/*.vue"
      ]
    }
    ```
    
- [vite.config.ts](https://cn.vitejs.dev/config/)
    
    
    ```tsx
    import path from 'node:path'
    import process from 'node:process'
    import { defineConfig, loadEnv } from 'vite'
    import vue from '@vitejs/plugin-vue'
    import createVitePlugins from './plugins/vite'
    
    // https://vitejs.dev/config/
    // 在开发环境下: command = serve， mode = development;
    // 在生产环境下: command = build， mode = production;
    export default defineConfig(({ command, mode }) => {
      // vite默认不加载.env文件，通过这个导出loadEnv函数来加载指定.env文件
      const env = loadEnv(mode, process.cwd())
    
      return {
        base: './',
        plugins: createVitePlugins(env, command === 'build'),
        resolve: {
          alias: {
            '@': path.resolve(__dirname, 'src'),
            '#': path.resolve(__dirname, 'src/types'),
          },
        },
        // https://esbuild.github.io/api/#drop
        esbuild: {
          drop: mode === 'production' ? ['console', 'debugger'] : [],
        },
    
        // https://cn.vitejs.dev/config/#server-options
        server: {
          open: true, // 服务器启动后，自动浏览器打开应用程序
          proxy: {
            '/proxy': {
              target: env.VITE_APP_API_BASEURL,
              changeOrigin: command === 'serve' && env.VITE_OPEN_PROXY === 'true',
              rewrite: path => path.replace(/\/proxy/, ''),
            },
          },
        },
        // https://cn.vitejs.dev/config/#server-fsserve-root
        build: {
          outDir: mode === 'production' ? `dist` : `dist-${mode}`,
          emptyOutDir: true,
          sourcemap: env.VITE_BUILD_IS_SOURCEMAP === 'true', // 构建后是否生成 source map
          rollupOptions: {
            // 自定义的build后 dist文件结构
            output: {
              chunkFileNames: 'assets/js/[name]-[hash].js', // 基本固定
              entryFileNames: 'assets/js/[name]-[hash].js', // 基本固定
              assetFileNames: 'assets/[ext]/[name]-[hash].[ext]', // 基本固定
              // manualChunks(id: any) {
              //   if (id.includes('node_modules') && id.includes('element-plus')) {
              //     return 'ep'
              //   }
              //   else if (id.includes('node_modules') && id.includes('echarts')) {
              //     return 'echarts'
              //   }
              //   else if (id.includes('node_modules')) {
              //     return 'vendor'
              //   }
              //   else if (id.includes('views/aas/')) {
              //     return 'aas'
              //   }
              // },
            },
          },
        },
      }
    })
    ```
    

## 选配

### 格式化方案

<aside>
💡 **采用 ESlint、Stylelint、postcss 、.vscode
*注意：*** 需要将package.json中的 **`type值`改为`module`**

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/80bbc51a-3738-44e1-ab8d-c328609bf9e6/4ef1e999-d267-41cd-9766-751b1f2a048a/Untitled.png)

</aside>

---

- ESlint
    
    ```jsx
    //安装依赖包
    pnpm i  eslint  @antfu/eslint-config  -D  
    ```
    
    <aside>
    💡 创建文件
    
    - eslint.config.js
        
        ```jsx
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
        ```
        
    - .lintstagedrc
        
        ```json
        {
          "*": "eslint . --cache --fix",
          "*.{css,scss,vue}": "stylelint src/**/*.{css,scss,vue} --cache --fix --allow-empty-input"
        }
        ```
        
    </aside>
    
- postcss
    
    ```jsx
    //安装依赖包
    pnpm i  postcss  autoprefixer  postcss-px2vp  -D  
    ```
    
    <aside>
    💡 创建文件
    
    - postcss.config.js
        
        ```jsx
        export default {
          plugins: {
            // https://github.com/sexyHuang/postcss-px2vp
            // 'postcss-px2vp': {
            //   // 需要转换的单位，默认为"px"
            //   unitToConvert: 'px',
            //   // 设计稿的视口宽度
            //   viewportWidth: 320,
            //   // 单位转换后保留的精度
            //   unitPrecision: 5,
            //   // 能转化为 vw 的属性列表
            //   propList: ['*'],
            //   // 希望使用的视口单位
            //   viewportUnit: 'vw',
            //   // 字体使用的视口单位
            //   fontViewportUnit: 'vw',
            //   // 需要忽略的 CSS 选择器，不会转为视口单位，使用原有的 px 等单位
            //   selectorBlackList: [],
            //   // 设置最小的转换数值，如果为 1 的话，只有大于 1 的值会被转换
            //   minPixelValue: 1,
            //   // 媒体查询里的单位是否需要转换单位
            //   mediaQuery: false,
            //   // 是否直接更换属性值，而不添加备用属性
            //   replace: true,
            //   // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
            //   exclude: [],
            // },
            autoprefixer: {},
          },
        }
        ```
        
    </aside>
    
- Stylelint
    
    ```jsx
    //安装依赖包
    pnpm i  stylelint stylelint-config-standard-scss  stylelint-config-standard-vue stylelint-scss stylelint-stylistic  -D  
    ```
    
    <aside>
    💡 配置文件
    
    - .stylelintignore
        
        ```jsx
        dist/
        node_modules/
        src/assets/sprites/
        ```
        
    - .stylelintrc
        
        ```json
        {
          "extends": [
            "stylelint-stylistic/config",
            "stylelint-config-standard-scss",
            "stylelint-config-standard-vue/scss"
          ],
          "plugins": ["stylelint-scss"],
          "rules": {
            "stylistic/max-line-length": null,
            "stylistic/block-closing-brace-newline-after": [
              "always",
              {
                "ignoreAtRules": ["if", "else"]
              }
            ],
            "at-rule-no-unknown": null,
            "no-descending-specificity": null,
            "property-no-unknown": null,
            "font-family-no-missing-generic-family-keyword": null,
            "selector-class-pattern": null,
            "scss/double-slash-comment-empty-line-before": null,
            "scss/no-global-function-names": null
          }
        }
        ```
        
    </aside>
    
- EditorConfig ( 配合插件`EditorConfig for VS Code` )
    
    <aside>
    💡 配置文件
    
    - .editorconfig
        
        ```jsx
        # 配置项文档：https://editorconfig.org/
        
        # 告知 EditorConfig 插件，当前即是根文件
        root = true
        
        # 适用全部文件
        [*]
        ## 设置字符集
        charset = utf-8
        ## 缩进风格 space | tab，建议 space
        indent_style = space
        ## 缩进的空格数（修改这里的话需要将 prettier.config.js 和 .vscode -> settings.json 也同步修改）
        indent_size = 2
        ## 换行符类型 lf | cr | crlf，一般都是设置为 lf
        end_of_line = lf
        ## 是否在文件末尾插入空白行
        insert_final_newline = true
        ## 是否删除一行中的前后空格
        trim_trailing_whitespace = true
        
        # 适用 .md 文件
        [*.md]
        insert_final_newline = false
        trim_trailing_whitespace = false
        ```
        
    </aside>
    
- 其他
    - .vscode（vscode自动生成文件）
        - settings.json
            
            ```json
            {
              "commentTranslate.hover.enabled": true,
              "eslint.experimental.useFlatConfig": true,
              "prettier.enable": false,
              "editor.formatOnSave": false,
              "editor.codeActionsOnSave": {
                "source.fixAll.eslint": true,
                "source.fixAll.stylelint": true,
                "source.organizeImports": false
              },
              "files.exclude": {
                "**/.git": true,
                "**/.svn": true,
                "**/.hg": true,
                "**/CVS": true,
                "**/.DS_Store": true,
                "**/Thumbs.db": true,
                "**/dist": true,
                "node_modules": true
              },
              "stylelint.validate": [
                "css",
                "scss",
                "vue"
              ],
              "eslint.validate": [
                "javascript",
                "javascriptreact",
                "typescript",
                "typescriptreact",
                "vue",
                "html",
                "markdown",
                "json",
                "jsonc",
                "yaml"
              ]
            }
            ```
            
        - extensions.json
            
            ```jsx
            {
              "recommendations": [
                "ms-ceintl.vscode-language-pack-zh-hans",
                "formulahendry.auto-close-tag",
                "formulahendry.auto-rename-tag",
                "naumovs.color-highlight",
                "ren-wei.echarts-enhanced-completion",
                "editorconfig.editorconfig",
                "mikestead.dotenv",
                "dbaeumer.vscode-eslint",
                "shenjiaolong.vue-helper",
                "zhubincong.vue-component",
                "sdras.vue-vscode-snippets",
                "dariofuzinato.vue-peek",
                "hollowtree.vue-snippets",
                "antfu.unocss",
                "simonhe.to-unocss",
                "meganrogge.template-string-converter",
                "simonsiefke.svg-preview",
                "stylelint.vscode-stylelint",
                "wiensss.region-highlighter",
                "voldemortensen.rainbow-tags",
                "cipchk.cssrem",
                "yoavbls.pretty-ts-errors",
                "alefragnani.project-manager",
                "esbenp.prettier-vscode",
                "christian-kohler.path-intellisense",
                "ibm.output-colorizer",
                "pkief.material-icon-theme",
                "ritwickdey.liveserver",
                "xabikos.javascriptsnippets",
                "oderwat.indent-rainbow",
                "kisstkondoros.vscode-gutter-preview",
                "styled-components.vscode-styled-components",
                "adpyke.codesnap",
                "vue.volar",
                "vue.vscode-typescript-vue-plugin",
                "streetsidesoftware.code-spell-checker",
                "codeium.codeium",
                "intellsmi.comment-translate",
                "dzhavat.css-initial-value",
                "xuanzai.element-vue",
                "usernamehw.errorlens",
                "vincaslt.highlight-matching-tag"
              ]
            }
            ```
            
        - vue.code-snippets
            
            ```
            {
              "vue3": {
                "description": "Vue3"
                "prefix": "vue3",   // 主要
                "body": [
                  "<script lang=\"ts\" setup></script>\n",
                  "<template>",
                  "\t<div class=\"app-container\">...</div>",
                  "</template>\n",
                  "<style scoped></style>",
                  "$1"
                ],
              }
            }
            ```
            
    - npm
        - .npmrc
            
            ```
            # https://pnpm.io/zh/npmrc#shamefully-hoist
            # 通过该配置兜底解决组件没有类型提示的问题
            shamefully-hoist=true
            strict-peer-dependencies=false
            # registry=https://registry.npm.taobao.org
            ```
            
    - git
        - .gitignore
            
            ```
            node_modules
            .DS_Store
            dist*
            dist-ssr
            *.local
            .eslintcache
            .stylelintcache
            ```
            

## 常见问题：

- 常见跨域解决办法
    - `后端`controller的顶部添加`@CrossOrigin`
        
        ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/80bbc51a-3738-44e1-ab8d-c328609bf9e6/d0989eee-d23a-403e-9834-d104ea69488c/Untitled.png)
        
    - `前端`配置（vite ， axios）
