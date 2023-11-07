import { getCurrentInstance } from 'vue'

import type { ComponentInternalInstance } from 'vue'

import type useGlobelPropertiesType from '~/useGlobelPropertiesType'

export default function useGlobelProperties(): useGlobelPropertiesType {
  const { appContext } = getCurrentInstance() as ComponentInternalInstance
  return appContext.config.globalProperties
}
