export default [
    {
        path: '/goods-info',
        name: 'goodsInfo',
        desc: '商品信息',
        meta: {
            keepAlive: true,
            menu: {
                firCode: '101',
                secCode: '1011',
                menuCode: '10111'
            }
        },
        component: () => import(/* webpackChunkName: "goodsInfo" */ '@/views/goods/goodsInfo/goodsList')
    },
    {
        path: '/goods-prop',
        name: 'goodsProp',
        desc: '商品属性',
        meta: {
            keepAlive: true,
            menu: {
                firCode: '101',
                secCode: '1011',
                menuCode: '10112'
            }
        },
        component: () => import(/* webpackChunkName: "goodsProp" */ '@/views/goods/goodsProp')
    },
]
