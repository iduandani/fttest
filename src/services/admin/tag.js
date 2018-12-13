import http from '@/utils/http'
export const getAllTag = function (){
    return http.get('Admin/Tag/allwithoutchoice')
}
