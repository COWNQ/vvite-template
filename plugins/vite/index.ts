import type { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import autoImport from 'unplugin-auto-import/vite'
import components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default function createVitePlugins(viteEnv, isBuild = false) {
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    vue(),
    vueJsx(),
    // https://github.com/unplugin/unplugin-vue-components#installation
    components({
      dts: './src/types/modules/components.d.ts',
      include: [/\.vue$/, /\.vue\?vue/, /\.tsx$/],
      resolvers: [ElementPlusResolver()],
    }),
    // https://github.com/unplugin/unplugin-auto-import#install
    autoImport({
      imports: ['vue', 'vue-router'],
      dts: './src/types/modules/auto-imports.d.ts',
      resolvers: [ElementPlusResolver()],
      eslintrc: {
        enabled: true,
        filepath: './src/utils/.eslintrc-auto-import.json',
      },
    }),
  ]

  // 返回
  return vitePlugins
}
