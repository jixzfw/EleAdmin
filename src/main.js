// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import VueResource from 'vue-resource'
import 'element-ui/lib/theme-default/index.css'

Vue.use(ElementUI)
Vue.use(VueResource)

import App from './App'

import Ajaxer from './minix/ajax.js'

// import router from './router'

Vue.http.options.emulateJSON = true

/* eslint-disable no-new */
window.app = new Vue({
	el: '#app',
  mixins: [
    Ajaxer
  ],
  template:'<App/>',
  components: { App }
})
