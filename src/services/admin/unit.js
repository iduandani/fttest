import http from '@/utils/http'
export const getAllUnit = function (){
    return http.get('Admin/Unit')
}
