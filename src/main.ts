import { createApp } from 'vue'
import router from './js/router'
import App from './App.vue'
import { createStore } from 'vuex'

// 导入element UI的响应式布局：基于断点的隐藏类
import 'element-plus/theme-chalk/display.css'

// 创建一个新的 store 实例
const store = createStore({
  state() {
    return {
      IsDarkMode: false,
      IsChinese: false,
      userInfo: {}
    }
  },
  mutations: {
    SwitchTheme(state: {
      userInfo: Object,
      IsDarkMode: boolean,
      IsChinese: boolean
    }) {
      state.IsDarkMode = !state.IsDarkMode
    },
    SwitchLang(state) {
      state.IsChinese = !state.IsChinese
    },
    Logout(state) {
      state.userInfo = {}
    },
    Login(state, info) {
      state.userInfo = info
    }
  }
})

const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')