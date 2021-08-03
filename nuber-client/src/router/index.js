import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
Vue.use(VueRouter)
/*
* If not building with SSR mode, you can
* directly export the Router instantiation
*/
const isUserLoggedIn = () => {
  return new Promise((resolve, reject) => {
    const unsubscribeOnAuthStateChanged =
            Vue.prototype.$auth.onAuthStateChanged(theUser => {
              resolve(theUser)
              unsubscribeOnAuthStateChanged()
            }, err => {
              console.error(err)
              resolve(null)
              unsubscribeOnAuthStateChanged()
            })
  })
}
export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,
    // Leave these as they are and change in quasar.conf.js instead,
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })
  Router.beforeEach(async (to, from, next) => {
    console.log(Vue.prototype.$auth.currentUser)
    if (to.matched.some(record => record.meta.auth)) {
      await isUserLoggedIn()
        .then(res => {
          if (res) {
            next()
          } else {
            next('/')
          }
        })
    } else {
      next()
    }
  })
  return Router
}
