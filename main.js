import Vue from 'vue'
import App from './App'
import {myHttp,myInterceptor,myWebHttp } from './utils/api.js'
import myConstan from './utils/const.js'
import comUtils from '@/utils/common_utils.js'

Vue.config.productionTip = false
Vue.prototype.$myHttp = myHttp
Vue.prototype.$myWebHttp = myWebHttp
Vue.prototype.$interceptor = myInterceptor
Vue.prototype.$myConstan = myConstan
Vue.prototype.$comUtils = comUtils


App.mpType = 'app'

// 引入全局uView
import uView from '@/uni_modules/uview-ui'
Vue.use(uView);

import backTop from 'component/toTop/toTop.vue';
import mytabs from 'component/mytabs.vue'
const app = new Vue({
    ...App
})
app.$mount()
Vue.component('backTop', backTop) //注册backTop组件为全局组件
Vue.component('my-tabs', mytabs) //注册backTop组件为全局组件
