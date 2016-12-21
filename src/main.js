import Vue from 'vue'
import ElementUI from 'element-ui'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'

import 'element-ui/lib/theme-default/index.css'
import App from './App.vue'

Vue.use(ElementUI);
Vue.use(VueResource);
Vue.use(VueRouter);

Vue.http.options.emulateJSON = true;

const routes = [
  {
    path: '*',
    component: function index(resolve) {
      require(['./Monitor.vue'], resolve);
		}
	}
];

const router = new VueRouter({
    routes // （缩写）相当于 routes: routes
});
window.router = router;

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
