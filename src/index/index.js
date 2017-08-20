require('es6-promise').polyfill();
// Vue和Vuex
import Vue from 'vue'
import Vuex from 'vuex'
// 使用vuex
Vue.use(Vuex);
// 引入样式
import './index.less';
// 根vue component
import App from './app.vue'
// store对象生成器
import generateStore from './store/store.js'


import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI)

function renderPage(storeObj) {
    let store = new Vuex.Store(storeObj);
    window.vm = new Vue({
        el: '#app',
        store,
        render: h => h(App, {
            props: {
                data: store.state
            }
        })
    });
}

/**
 * 获取基础参数
 */
function getBaseArguments(){
	// 基本参数
	let baseargs = {};
	// ---------------
	// get arguments (例如：经纬度、ua信息等)
	// ---------------
	return baseargs;
}

(function init() {
    let baseargs = getBaseArguments();
    let storeObj = generateStore(baseargs); //状态树
    renderPage(storeObj);
})();
