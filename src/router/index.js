import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store";

//后台
const Manage = () => import('../views/Manage.vue');
const Home = () => import('../views/Home.vue');
const User = () => import('../views/User.vue');

//前台
const Front = () => import('../views/front/Front.vue');
const FrontHome = () => import('../views/front/Home.vue');
const FrontDetail = () => import('../views/front/Detail.vue');

const Login = () => import('../views/Login.vue');
const NO = () => import('../views/404.vue');


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: Manage,
        redirect: "/front/home",
        children: [
            {path: 'home', name: '首页', component: Home},
            {path: 'user', name: '用户管理', component: User},
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/404',
        name: '404',
        component: NO
    },
    {
        path: '/front',
        name: 'Front',
        component: Front,
        children: [
            {
                path: 'home',
                name: 'FrontHome',
                component: FrontHome
            },
            {
                path: 'detail',
                name: 'Detail',
                component: FrontDetail
            },
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

// 重置路由
export const resetRouter = () => {
    router.matcher = new VueRouter({
        mode: 'history',
        routes
    })
}

// 路由守卫
router.beforeEach((to, from, next) => {
    let user = localStorage.getItem('user')       //获取点击登录按钮时所设置的 localStorage
    if (to.path === '/home') {        //如果想要跳转home或页面必须判断有没有localStorage
        if (user) {              //如果有localStorage
            next();				//跳转
        } else {
            alert('您还没有登录，请先登录账户');   //没有就先登录
            next('/login')							//还在登录页
        }
    } else {
        if (to.path === '/login') {				//如果跳转到了登录页面必须清空localStorage，否则在地址栏输入路径还是会跳转
            localStorage.clear();				//清空localStorage
        }
        localStorage.setItem("currentPathName", to.name)  // 设置当前的路由名称，为了在Header组件中去使用
        store.commit("setPath")  // 触发store的数据更新
        next();
    }
})


export default router
