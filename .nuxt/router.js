import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _62a52255 = () => interopDefault(import('../client/pages/admin/index.vue' /* webpackChunkName: "pages/admin/index" */))
const _e54bad26 = () => interopDefault(import('../client/pages/cart.vue' /* webpackChunkName: "pages/cart" */))
const _a5429f28 = () => interopDefault(import('../client/pages/login.vue' /* webpackChunkName: "pages/login" */))
const _0734fe20 = () => interopDefault(import('../client/pages/register.vue' /* webpackChunkName: "pages/register" */))
const _2c4cc56c = () => interopDefault(import('../client/pages/admin/login.vue' /* webpackChunkName: "pages/admin/login" */))
const _691b03f4 = () => interopDefault(import('../client/pages/admin/products/index.vue' /* webpackChunkName: "pages/admin/products/index" */))
const _54b0aece = () => interopDefault(import('../client/pages/admin/users/index.vue' /* webpackChunkName: "pages/admin/users/index" */))
const _3c0c756c = () => interopDefault(import('../client/pages/admin/products/create.vue' /* webpackChunkName: "pages/admin/products/create" */))
const _691975b0 = () => interopDefault(import('../client/pages/admin/users/create.vue' /* webpackChunkName: "pages/admin/users/create" */))
const _1f7f868d = () => interopDefault(import('../client/pages/admin/products/_id/edit.vue' /* webpackChunkName: "pages/admin/products/_id/edit" */))
const _034970ee = () => interopDefault(import('../client/pages/admin/users/_id/cart.vue' /* webpackChunkName: "pages/admin/users/_id/cart" */))
const _5d74b573 = () => interopDefault(import('../client/pages/admin/users/_id/edit.vue' /* webpackChunkName: "pages/admin/users/_id/edit" */))
const _3891e556 = () => interopDefault(import('../client/pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/admin",
    component: _62a52255,
    name: "admin"
  }, {
    path: "/cart",
    component: _e54bad26,
    name: "cart"
  }, {
    path: "/login",
    component: _a5429f28,
    name: "login"
  }, {
    path: "/register",
    component: _0734fe20,
    name: "register"
  }, {
    path: "/admin/login",
    component: _2c4cc56c,
    name: "admin-login"
  }, {
    path: "/admin/products",
    component: _691b03f4,
    name: "admin-products"
  }, {
    path: "/admin/users",
    component: _54b0aece,
    name: "admin-users"
  }, {
    path: "/admin/products/create",
    component: _3c0c756c,
    name: "admin-products-create"
  }, {
    path: "/admin/users/create",
    component: _691975b0,
    name: "admin-users-create"
  }, {
    path: "/admin/products/:id/edit",
    component: _1f7f868d,
    name: "admin-products-id-edit"
  }, {
    path: "/admin/users/:id/cart",
    component: _034970ee,
    name: "admin-users-id-cart"
  }, {
    path: "/admin/users/:id/edit",
    component: _5d74b573,
    name: "admin-users-id-edit"
  }, {
    path: "/",
    component: _3891e556,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
