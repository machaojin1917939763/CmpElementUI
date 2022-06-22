import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import layer from "vue-layer";
import "vue-layer/lib/vue-layer.css";
Vue.prototype.$layer = layer(Vue, {
    msgtime: 3 //目前只有一项，即msg方法的默认消失时间，单位：秒
});
import $ from 'jquery'







Vue.config.productionTip = false;

Vue.use(ElementUI);


new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App }
})
