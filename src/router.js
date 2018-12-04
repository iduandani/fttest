import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      meta: {
        keepAlive: true,
        menu: {
          firCode: '100'
        }
      },
      component: () => import(/* webpackChunkName: "goodsInfo" */ './views/home')
    },
    {
      path: '/goods-info',
      name: 'goodsInfo',
      meta: {
        keepAlive: true,
        menu: {
          firCode: '101',
          secCode: '1011',
          menuCode: '10111'
        }
      },
      component: () => import(/* webpackChunkName: "goodsInfo" */ './views/goods/goodsInfo')
    },
    {
      path: '/goods-prop',
      name: 'goodsProp',
      meta: {
        keepAlive: true,
        menu: {
          firCode: '101',
          secCode: '1011',
          menuCode: '10112'
        }
      },
      component: () => import(/* webpackChunkName: "goodsProp" */ './views/goods/goodsProp')
    },
    {
      path: '*',
      redirect: {path: '/home'}
    }
  ]
})
