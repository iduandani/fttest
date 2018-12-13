import http from '@/utils/http'
export const getGoodsList = function (params){
    return http.get('Admin/Goods/all',{
        params: params
    })
}
export const getGoodsSpecificationTypes = function (params){
    return http.get('Admin/Goods/goodsSpecificationTypes/' + params.id)
}
export const getGoodsTag = function (params){
    return http.get('Admin/Goods/goodsTag/' + params.id)
}
export const getGoodsDetails = function (params){
    return http.get('Admin/Goods/view/' + params.id)
}
export const auditGoods = function (params){
    let url = 'Admin/Goods/audit?id=' + params.id
    return http.patch(url)
}
export const batchAudit = function (params){
    return http.patch('Admin/Goods/bulkAudit',params)
}
export const addGoods = function (params){
    return http.post('Admin/Goods/create',params)
}
export const editGoods = function (params){
    return http.put('Admin/Goods/edit',params)
}
export const addMultiGoods = function (params){
    return http.post('Admin/MultiGoods/create',params)
}
export const editMultiGoods = function (params){
    return http.put('/Admin/MultiGoods/edit',params)
}
export const getMultiGoods = function (params){
    return http.get('Admin/MultiGoods/children/' + params.id)
}
