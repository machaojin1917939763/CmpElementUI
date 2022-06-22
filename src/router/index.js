import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');
const partsList = r => require.ensure([], () => r(require('@/page/parts/partsList')), 'partsList');
const addGoods = r => require.ensure([], () => r(require('@/page/parts/addGoods')), 'addGoods');
const userList = r => require.ensure([], () => r(require('@/page/user/userList')), 'userList');
const shopList = r => require.ensure([], () => r(require('@/page/order/shopList')), 'shopList');
const partsReptileList = r => require.ensure([], () => r(require('@/page/parts/partsReptileList')), 'partsReptileList');
const orderList = r => require.ensure([], () => r(require('@/page/order/orderList')), 'orderList');
const adminList = r => require.ensure([], () => r(require('@/page/system/adminList')), 'adminList');
const visitor = r => require.ensure([], () => r(require('@/page/product/visitor')), 'visitor');
const newMember = r => require.ensure([], () => r(require('@/page/product/newMember')), 'newMember');
const uploadImg = r => require.ensure([], () => r(require('@/page/product/uploadImg')), 'uploadImg');
const vueEdit = r => require.ensure([], () => r(require('@/page/constract/vueEdit')), 'vueEdit');
const constratProduct = r => require.ensure([], () => r(require('@/page/constract/constratProduct')), 'constratProduct');
const customerLIst = r => require.ensure([], () => r(require('@/page/customer/customerLIst')), 'customerLIst');
const sendMessage = r => require.ensure([], () => r(require('@/page/system/sendMessage')), 'sendMessage');
const explain = r => require.ensure([], () => r(require('@/page/product/explain')), 'explain');
const addCustomer = r => require.ensure([], () => r(require('@/page/customer/addCustomer')), 'addCustomer');
const addUser = r => require.ensure([], () => r(require('@/page/user/addUser')), 'addUser');
const orderEdit = r => require.ensure([], () => r(require('@/page/order/orderEdit')), 'orderEdit');
const addParts = r => require.ensure([], () => r(require('@/page/parts/addParts')), 'addParts');
const partsOutIn = r => require.ensure([], () => r(require('@/page/parts/partsOutIn')), 'partsOutIn');

const routes = [
	{
		path: '/',
		component: login
	},
	{
		path: '/manage',
		component: manage,
		name: '',
		children: [
            {
                path: '/partsOutIn',
                component: partsOutIn,
                meta: ['配件模块','配件出入库管理','配件出入库'],
            },
            {
                path: '/constratProduct',
                component: constratProduct,
                meta: ['物资合同','产品销售管理'],
            },
            {
                path: '/addParts',
                component: addParts,
                meta: ['配件模块','配件管理','新增配件'],
            },
            {
                path: '/addCustomer',
                component: addCustomer,
                meta: ['客户管理','添加客户'],
            }, {
			path: '',
			component: home,
			meta: [],
		}, {
			path: '/partsList',
			component: partsList,
			meta: ['配件模块', '配件管理'],
		},{
			path: '/addGoods',
			component: addGoods,
			meta: ['配件模块', '配件出入库管理'],
		},{
			path: '/userList',
			component: userList,
			meta: ['系统管理', '用户管理'],
		},{
			path: '/shopList',
			component: shopList,
			meta: ['订单模块', '订单管理'],
		},{
			path: '/partsReptileList',
			component: partsReptileList,
			meta: ['配件模块', '配件出入库流水查询'],
		},{
			path: '/orderList',
			component: orderList,
			meta: ['订单模块', '订单审核'],
		},{
			path: '/adminList',
			component: adminList,
			meta: ['订单模块', '管理员列表'],
		},{
			path: '/visitor',
			component: visitor,
			meta: ['产品信息', '产品管理'],
		},{
			path: '/newMember',
			component: newMember,
			meta: ['产品信息', '组装管理'],
		},{
			path: '/uploadImg',
			component: uploadImg,
			meta: ['产品信息', '上线管理'],
		},{
			path: '/vueEdit',
			component: vueEdit,
			meta: ['物资合同', '配件合同管理'],
		},{
			path: '/customerLIst',
			component: customerLIst,
			meta: ['系统管理', '客户管理'],
		},{
			path: '/sendMessage',
			component: sendMessage,
			meta: ['设置', '发送通知'],
		},{
			path: '/explain',
			component: explain,
			meta: ['产品信息', '下线管理'],
		},{
                path: '/addUser',
                component: addUser,
                meta: ['用户管理', '新增用户'],
            },
            {
                path: '/orderEdit',
                component: orderEdit,
                meta: ['订单管理', '订单信息修改'],
            }
        ]
	}
]

export default new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production',
})
