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
