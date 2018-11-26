//import http from '@/utils/http'
const apiTest  = function(){
    return new Promise((resolve)=>{
        //console.log(http)
        resolve({
            name:'test'
        })
    })
}
export { apiTest }
