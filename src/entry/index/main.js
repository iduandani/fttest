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
    Checkbox,
    DatePicker
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
Vue.component('DatePicker', DatePicker)

Vue.prototype.$baseUrl = process.env.VUE_APP_BASEURL
//fundebug


Vue.config.productionTip = false

// 挂在app.vue
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
