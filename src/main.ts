import { createApp } from 'vue'

import App from './App.vue'

import router from './router'
import pinia from './store'
import api from './api'

const app = createApp(App)

app.config.globalProperties.$api = api

app.use(router)
app.use(pinia)
app.mount('#app')
