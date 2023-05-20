
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/TodayPage.vue') }
    ]
  },
  {
    path: '/todos',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/TodoPage.vue') }
    ]
  },
  {
    path: '/done',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/DonePage.vue') }
    ]
  },
  {
    path: '/removed',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/RemovedPage.vue') }
    ]
  },
  {
    path: '/settings',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/SettingsPage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
