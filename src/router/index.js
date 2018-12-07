import Vue from 'vue'
import Router from 'vue-router'
import goodsRouters from './goods-routers'
Vue.use(Router)

export default new Router({
    routes: [
        // 首页概览
        {
            path: '/home',
            name: 'home',
            meta: {
                keepAlive: true,
                menu: {
                    firCode: '100'
                }
            },
            component: () => import(/* webpackChunkName: "goodsInfo" */ '@/views/home')
        },

        ...goodsRouters, // 商品路由配置

        // 匹配不到的路由，跳转到首页
        {
            path: '*',
            redirect: {path: '/home'}
        }
    ]
})
