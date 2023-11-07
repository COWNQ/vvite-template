import { resolve } from 'node:path'
import process from 'node:process'
import { defineConfig, loadEnv } from 'vite'

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
        '@': resolve(__dirname, 'src'),
        '#': resolve(__dirname, 'src/utils'),
        '~': resolve(__dirname, 'src/types'),
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
        '/api': { // 将/api开头的请求代理到target指定服务器（用/api替换目标服务器），
          target: env.VITE_APP_API_BASEURL, // 请求哪个地址，报了跨域问题则放哪个地址
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ''), // 将路径中的/api以及前面的东西替换为空
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
