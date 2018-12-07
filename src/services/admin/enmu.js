import http from '@/utils/http'
export const getGoodsType = function (){
    return http.get('Admin/Enum/GoodsType')
}
export const getGoodsCategory = function (){
    return http.get('Admin/GoodsCategory')
}
export const getApproveStatus = function (){
    return http.get('Admin//Enum/approveStatus')
}
