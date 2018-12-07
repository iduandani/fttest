import http from '@/utils/http'
export const getGoodsList = function (params){
    return http.get('Admin/Goods/all',{
        params: params
    })
}
