import Vue from 'vue';
import VueRouter from 'vue-router';
import Routers from './routers';


Vue.use(VueRouter);

// router config
const RouterConfig = {
  // enable HTML5 History mode
  mode: 'history',
  routes: Routers
};


export function createRouter () {
  return new VueRouter(RouterConfig);
}