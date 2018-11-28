import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'iview/dist/styles/iview.css';
import 'normalize.css'

import '@/utils'
import {
  Button,
  Table,
  Input,
  Page,
  Select,
  Option,
  OptionGroup
} from 'iview';
Vue.component('Button', Button);
Vue.component('Table', Table);
Vue.component('Input', Input);
Vue.component('Page', Page);
Vue.component('Select', Select);
Vue.component('Option', Option);
Vue.component('OptionGroup', OptionGroup);

Vue.config.productionTip = false

var a = 1

new Vue({
  a,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
