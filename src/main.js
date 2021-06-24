import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入全局样式表
import './assets/css/global.css'
//导入字体图标
import './assets/font/iconfont.css'
//
import TreeTable from 'vue-table-with-tree-grid'
//导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
//require styles 导入富文本编辑器对应的样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'


import axios from 'axios'
//这是配置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
axios.interceptors.request.use(config => {
  console.log(config)
  config.headers.Authorization = sessionStorage.getItem('token')
  //在最后必须return config
  return config
})
Vue.use(VueQuillEditor)
Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.component('tree-table', TreeTable),
  Vue.filter('dateFormat', function(originVal) {
    const time = new Date(originVal*1000)
    const y = time.getFullYear()
    const m = (time.getMonth() + 1 + '').padStart(2, '0')
    const d = (time.getDate() + '').padStart(2, '0')
    const hh = (time.getHours() + '').padStart(2, '0')
    const mm = (time.getMinutes() + '').padStart(2, '0')
    const ss = (time.getSeconds() + '').padStart(2, '0')
    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
  })

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
