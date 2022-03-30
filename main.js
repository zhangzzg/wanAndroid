import Vue from 'vue'
import App from './App'
import {myHttp,myInterceptor,myWebHttp } from './utils/api.js'
import myConstan from './utils/const.js'

Vue.config.productionTip = false
Vue.prototype.$myHttp = myHttp
Vue.prototype.$myWebHttp = myWebHttp
Vue.prototype.$interceptor = myInterceptor
Vue.prototype.$myConstan = myConstan

App.mpType = 'app'

// 引入全局uView
import uView from 'uview-ui';
Vue.use(uView);

const app = new Vue({
    ...App
})
app.$mount()