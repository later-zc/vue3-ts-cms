import { createApp } from 'vue'
import App from './App.vue'
import 'normalize.css'
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'

import './assets/css/index.less'
import router from './router'
import registerStore from './store'
import registerIcons from './global/register-icons'
// import 'element-plus/theme-chalk/el-message.css'

const app = createApp(App)
app.use(registerIcons)
app.use(registerStore)
// 在pinia挂载完之后，映射本地路由并添加到路由表中之后，再去挂载路由去使用（这时才会进行路由匹配）
// 如果不按这样顺序，用户刷新时，路由挂载完就进行路由的匹配了，而此时我们动态映射路由等操作很有可能还没添加到对应的路由表中
app.use(router)
// app.use(ElementPlus)
app.mount('#app')
