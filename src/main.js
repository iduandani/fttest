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

function formatComponentName(vm) {
  if (vm.$root === vm) return 'root';
  var name = vm._isVue
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
console.log(process.env.NODE_ENV)
if(process.env.NODE_ENV === 'production'){
  var fundebug = require('fundebug-javascript');
  fundebug.apikey = '18a2bc4560d4b9731c73e99bbb248c8dd5b57416959a3621163639d4e451e20a';
  Vue.config.errorHandler = function(err, vm, info) {
    if (vm) {
        var componentName = formatComponentName(vm);
        var propsData = vm.$options && vm.$options.propsData;
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

var a = 1

new Vue({
  a,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
