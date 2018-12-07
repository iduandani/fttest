export default  [{
    id: 1,
    code: '100',
    title: '概览',
    icon: 'home',
    url: '/home'
},{
    id: 2,
    code: '101',
    title: '商品',
    icon: 'goods',
    children: [{
        id: 11,
        code: '1011',
        title: '商品中心',
        children: [{
            id: 111,
            code: '10111',
            title: '商品资料',
            url: 'goods-info'
        },
        {
            id: 112,
            code: '10112',
            title: '商品属性',
            url: 'goods-prop'
        }]
    },{
        id: 13,
        code: '1012',
        title: '供应商管理',
        children: [{
            id: 14,
            code: '10121',
            title: '供应商资料',
        },
        {
            id: 15,
            code: '10124',
            title: '供应商属性',
        }]
    }]
},{
    id: 3,
    code: '102',
    title: '库存',
    icon: 'store',
}]
