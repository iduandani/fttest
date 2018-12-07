import Vue from 'vue'
import Login from './Login.vue'
import 'normalize.css'//样式reset

Vue.config.productionTip = false

// 挂在app.vue
new Vue({
    render: h => h(Login)
}).$mount('#app')
