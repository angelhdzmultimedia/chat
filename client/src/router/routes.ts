import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('src/layouts/main.vue'),
    children: [{ path: '', component: () => import('src/pages/index.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('src/pages/[...path].vue'),
  },
];

export default routes;
