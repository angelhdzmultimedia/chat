import { route } from 'quasar/wrappers';
import {
  createRouter,
  createWebHistory,
} from 'vue-router/auto';
 


import {setupLayouts} from 'virtual:generated-layouts'
import { storeToRefs } from 'pinia'
import { useChatStore } from 'src/stores/chat.store'

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    extendRoutes: (routes: any) => setupLayouts(routes),
    

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createWebHistory(process.env.VUE_ROUTER_BASE),
  });

  Router.beforeResolve((to) => {
    const {isConnected} = storeToRefs(useChatStore())

    if (to.meta.requiresConnection && !isConnected.value) {
      return '/'
    }
  })

  export default Router;

