import http from '@/utils/http'
export const getAllSpecification = function (){
    return http.get('Admin/Specification')
}
