/// <reference types="vite/client" />

// 智能提示.env[mode]的环境变量
interface ImportMetaEnv {
  // readonly xxx: string
  // 更多环境变量...
  VITE_APP_API_BASEURL: string
}
