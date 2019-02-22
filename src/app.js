import Vue from 'vue';
import $ from "jquery";
import "bootstrap";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/@micro-focus/quantum-ux-bootstrap/dist/bootstrap3/css/qtm-bs3.css';
import '../node_modules/@micro-focus/quantum-ux-bootstrap/dist/bootstrap3/css/qtm-bs3-imports.css';
//import './assets/style.css';
import App from './App.vue';
import { createStore } from './store';
import { createRouter } from './router';
import fileDownload from 'js-file-download'
import Uri from 'jsuri';
import Util from './lib/utils';

const store = createStore();
const router = createRouter();

router.beforeEach((to, from, next) => {
  if (store.state.currentData.edit || store.state.currentData.copy) {
    store.commit("cleanCurrentData");
  }
  next();
});

// Add a request interceptor
Util.fetch.interceptors.request.use(function (config) {
  let loginId = Util.getQuery("loginId");
  let uri = new Uri(config.url);
  if (config.showLoading) {
    store.commit("updateLoading", true);
  }
  if (uri.path().startsWith("/sbot/config")) {
    let value = uri.getQueryParamValue("loginId");
    if (!value || value === "") {
      uri.addQueryParam("loginId", loginId);
    } else {
      uri.replaceQueryParam("loginId", loginId);
    }
    config.url = uri.toString();
  }

  return config;
});

//Add a response interceptor
Util.fetch.interceptors.response.use(async res => {
  let resBlob = res.data;
  let resData = null;
  if (res.config.showLoading) {
    store.commit("updateLoading", false);
  }

  try {
    let resText = await new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.addEventListener('abort', reject);
      reader.addEventListener('error', reject);
      reader.addEventListener('loadend', () => {
        resolve(reader.result);
      });
      reader.readAsText(resBlob);
    });
    resData = JSON.parse(resText) // try to parse as json eventually
  } catch (err) {
    // ignore error
  }
  if (resData) {
    return resData;
  } else {
    let query = res.config.data;
    if (_.isString(res.config.data)) {
      query = JSON.parse(res.config.data);
    }
    fileDownload(resBlob, query.filename);
  }
},function (error) {
  console.error(error);
  store.commit("updateLoading", false);
  let errorObj = {
    code: error.response ? error.response.status : 500,
    msg: error.response ? error.response.statusText : error.message
  };
  return Promise.resolve(errorObj);
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => {
    return h(App);
  }
});

// export function createApp () {
//   // create store and router instances
//   const store = createStore();
//   const router = createRouter();
//   router.beforeEach((to, from, next) => {
//     if (store.state.currentData.edit) {
//       store.commit("cleanCurrentData");
//     }
//     next();
//   });
//
//
//   const app = new Vue({
//     router,
//     store,
//     render: h => {
//       return h(App);
//     }
//   });
//
//   return { app, router, store }
// }