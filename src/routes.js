import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Order from './views/nav1/Order.vue'
import Path from './views/nav1/Path.vue'
import Plan from './views/nav1/Plan.vue'
import User from './views/nav2/User.vue'
import Page5 from './views/nav2/Page5.vue'
import Cars from './views/nav3/Cars.vue'
import Setting from "./views/nav4/Setting"
import echarts from './views/charts/echarts.vue'
import Safesetting from "./views/nav4/Safesetting";

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/cars', component: Cars, name: '车辆管理' }
        ]
    },
    {
        path: '/',
        component: Home,
        iconCls: 'fa fa-id-card-o',
        leaf: true,//只有一个节点
        children: [
            { path: '/user', component: User, name: '人员管理' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '订单配送管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/order', component: Order, name: '配送管理' },
            { path: '/path', component: Path, name: '配送路径' },
            { path: '/plan', component: Plan, name: '配送计划' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '成本分析',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/echarts', component: echarts, name: '成本分析' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '系统设置',
        iconCls: 'el-icon-setting',
        children: [
            { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/setting', component: Setting, name: '基本设置' },
            { path: '/safesetting', component: Safesetting, name: '安全设置' },
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;
