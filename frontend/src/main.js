import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import VueRouter from 'vue-router';
import middleware from './middleware/index'
import popperJs from 'popper.js';
import moment from 'moment';
//axios
import axios from 'axios';
import VueAxios from 'vue-axios';
//jquery
import jQuery from 'jquery';
global.jQuery = jQuery;
window.moment = moment;
var Bootstrap = require('bootstrap');
import 'bootstrap/dist/css/bootstrap.css';
const routes = require('./routes/index').default;
Vue.use(VueRouter);
Vue.use(VueAxios, axios);
Vue.use(Vuex);
const store = require('../vuex/index.js').default;
const router = new VueRouter({
	routes
});
middleware(router);
//components
Vue.component('navbar-component', require('./components/layout/navigation.vue').default);
Vue.component('home-component', require('./components/pages/home.vue').default);

new Vue({
  router,
  store,	 
  el: '#app',
  render: h => h(App)
});
