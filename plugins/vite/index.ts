import type { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default function createVitePlugins(viteEnv, isBuild = false) {
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    vue(),
    vueJsx(),
    // 解决跨域
  ]

  // 返回
  return vitePlugins
}
