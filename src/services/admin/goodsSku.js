import http from '@/utils/http'
export const getGoodsSkuDetails = function (params){
    return http.get('Admin/GoodsSku/goodsSku/' + params.id,{
        params
    })
}
export const getSkuGoods = function (params){
    return http.get('Admin/GoodsSku',{
        params
    })
}
