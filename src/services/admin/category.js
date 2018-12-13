import http from '@/utils/http'
export const getGoodsCategory = function (){
    return http.get('Admin/GoodsCategory')
}
