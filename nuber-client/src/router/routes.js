const routes = [
  {
    path: '/',
    component: () => import('layouts/WelcomePageLayout.vue'),
    children: [
      { path: '', component: () => import('pages/WelcomePage/WelcomePageIndex.vue') }
    ]
  },
  {
    path: '/Login',
    component: () => import('layouts/LoginPageLayout.vue'),
    children: [
      {
        path: '', component: () => import('pages/Login/LoginIndex.vue')
      }
    ]
  },
  {
    path: '/Administration',
    component: () =>
      import('layouts/nuberLayout.vue'),
    meta: { auth: true },
    children: [
      {
        path: '/Cijena', meta: { auth: true }, component: () => import('pages/nuber/CijenaIndex.vue')
      },
      {
        path: '/Placanje', meta: { auth: true }, component: () => import('pages/nuber/PlacanjeIndex.vue')
      },
      {
        path: '/Vozac', meta: { auth: true }, component: () => import('pages/nuber/VozacIndex.vue')
      },
      {
        path: '/Vozilo', meta: { auth: true }, component: () => import('pages/nuber/VoziloIndex.vue')
      }
    ]
  }
]
// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}
export default routes
