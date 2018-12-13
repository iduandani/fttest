import Vue from 'vue'
import http from '@/utils/http'
import {
    Modal,
    Notice
} from 'iview';
Vue.prototype.$http = http

Vue.prototype.$dateFormat = function (date,fmt)   { //author: meizz
    let o = {
        'M+': date.getMonth() + 1,                 //月份
        'd+': date.getDate(),                    //日
        'h+': date.getHours(),                   //小时
        'm+': date.getMinutes(),                 //分
        's+': date.getSeconds(),                 //秒
        'q+': Math.floor((date.getMonth() + 3) / 3), //季度
        'S': date.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    for (let k in o)
        if (new RegExp('(' + k + ')').test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    return fmt;
}
Vue.prototype.$Alert = {
    success(desc,title = '信息'){
        Notice.success({
            title,
            desc
        })
    },
    warn(desc,title = '警告'){
        Notice.warning({
            title,
            desc
        })
    },
    info(desc,title = '提示'){
        Notice.info({
            title,
            desc
        })
    },
    error(desc,title = '错误'){
        Notice.error({
            title,
            desc
        })
    },
    confirm(obj){
        return new Promise((resolve,reject)=>{
            Modal.confirm({
                title: obj.title || '提示',
                content: obj.content || '',
                okText: obj.okText || '确认',
                cancelText: obj.cancelText || '取消',
                onOk: ()=>{
                    resolve()
                },
                onCancel: ()=>{
                    reject({
                        code: 'confirmCancel'
                    })
                }
            })
        })

    }
}


