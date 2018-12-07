import Vue from 'vue'
import App from './App.vue'
import router from '@/router'// 路由
import store from '@/store'// vuex


import 'normalize.css'//样式reset
import 'iview/dist/styles/iview.css';// iview 样式
import '@/style/cover/index.scss'// 重写覆盖iview 样式

//工具扩展
import '@/common/extend.js'

//常用控件全局引入
import {
    Button,
    Table,
    Input,
    Page,
    Icon,
    Select,
    Switch,
    Option,
    OptionGroup,
    Modal,
    CheckboxGroup,
    Checkbox
} from 'iview';
Vue.component('Button', Button);
Vue.component('Table', Table);
Vue.component('i-input', Input);
Vue.component('Page', Page);
Vue.component('Icon', Icon);
Vue.component('Select', Select);
Vue.component('i-switch', Switch);
Vue.component('Option', Option);
Vue.component('OptionGroup', OptionGroup);
Vue.component('Modal', Modal)
Vue.component('CheckboxGroup', CheckboxGroup)
Vue.component('Checkbox', Checkbox)
//fundebug
function formatComponentName(vm) {
    if (vm.$root === vm) return 'root';
    let name = vm._isVue
        ? (vm.$options && vm.$options.name) ||
        (vm.$options && vm.$options._componentTag)
        : vm.name;
    return (
        (name ? 'component <' + name + '>' : 'anonymous component') +
      (vm._isVue && vm.$options && vm.$options.__file
          ? ' at ' + (vm.$options && vm.$options.__file)
          : '')
    );
}
console.log(process.env.VUE_APP_FUNDEBUG)
if (process.env.VUE_APP_FUNDEBUG === 'true'){
    let fundebug = require('fundebug-javascript');
    fundebug.apikey = '18a2bc4560d4b9731c73e99bbb248c8dd5b57416959a3621163639d4e451e20a';
    Vue.config.errorHandler = function (err, vm, info) {
        if (vm) {
            let componentName = formatComponentName(vm);
            let propsData = vm.$options && vm.$options.propsData;
            fundebug.notifyError(err, {
                metaData: {
                    componentName: componentName,
                    propsData: propsData,
                    info: info
                }
            });
        } else {
            fundebug.notifyError(err);
        }
    };

}


Vue.config.productionTip = false

// 挂在app.vue
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
