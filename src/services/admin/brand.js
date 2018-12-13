import http from '@/utils/http'
export const getAllBrand = function (){
    return http.get('Admin/Brand/allbrands')
}
