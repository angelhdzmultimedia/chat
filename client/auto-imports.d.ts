export {}
declare global {
  const defineLoader: typeof import('vue-router/auto')['defineLoader']
  const definePage: typeof import('unplugin-vue-router/runtime')['_definePage']
  const onBeforeRouteLeave: typeof import('vue-router/auto')['onBeforeRouteLeave']
  const onBeforeRouteUpdate: typeof import('vue-router/auto')['onBeforeRouteUpdate']
  const useRoute: typeof import('vue-router/auto')['useRoute']
  const useRouter: typeof import('vue-router/auto')['useRouter']
}