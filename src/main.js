// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import iView from 'iview'

import 'iview/dist/styles/iview.css'

import App from './App'
import store from './store'


Vue.config.productionTip = process.env.NODE_ENV === 'production';
Vue.config.performance = Vue.config.devtools = process.env.NODE_ENV === 'development';

Vue.use(iView);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  store,
  template: '<App/>'
})
