import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'iview/dist/styles/iview.css';
import 'normalize.css'

import '@/utils'
import { Button, Table } from 'iview';
Vue.component('Button', Button);
Vue.component('Table', Table);

Vue.config.productionTip = false

var a = 1

new Vue({
  a,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
