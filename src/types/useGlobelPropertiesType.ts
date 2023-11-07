import type { AxiosInstance } from 'axios'
import type dayjs from 'dayjs'
import type { RouteLocationNormalizedLoaded, Router } from 'vue-router'

export default interface useGlobelPropertiesType {
  $api?: AxiosInstance
  $route?: RouteLocationNormalizedLoaded
  $router?: Router
  $pinia?: any
  $dayjs?: dayjs.Dayjs
}
