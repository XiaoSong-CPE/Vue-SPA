import { createRouter, createWebHashHistory } from "vue-router"
import 'js-cookie'


// 页面
const home = () => import('../view/home.vue')
const about = () => import('../view/about.vue')
const privacy = () => import('../view/privacy.vue')
const license = () => import('../view/license.vue')
const user = () => import('../view/user.vue')
const P404 = () => import('../view/P404.vue')
const login = () => import('../view/login.vue')

// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes = [
    { path: '/', component: home, name: 'home' },
    { path: '/home', redirect: { name: 'home' } },
    { path: '/user', component: user, name: 'user' },
    { path: '/about', component: about, name: 'about' },
    { path: '/license', component: license, name: 'license' },
    { path: '/privacy', component: privacy, name: 'privacy' },
    { path: '/login', component: login, name: 'login' },
    { path: '/404', component: P404, name: 'P404', },
    { path: '/:pathMatch(.*)*', redirect: { name: "P404" } }
]

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHashHistory(),
    routes, // `routes: routes` 的缩写
})

// 路由守卫
// router.beforeEach((to, from) => {
//     if ((to.name === 'user') && !store.state.loginInfo) {
//         console.log('拦截成功')
//         return { name: 'login' }
//     } else {
//         return true
//     }
// })

export default router