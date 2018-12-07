import Axios from 'axios'
import  jsonlint from '../utils/jsonlint.js'

let instence = Axios.create({
    baseURL: process.env.VUE_APP_BASEURL,
    transformResponse: [function (data) {
        if (data){
            return jsonlint.parse(data)
        }
    }]
})
instence.interceptors.response.use(function (response) {
    // Do something with response data
    return response.data;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});
export default instence
