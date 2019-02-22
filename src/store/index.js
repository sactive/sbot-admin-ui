import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';
import {getDefaultFormData} from './form';

Vue.use(Vuex);

//Enable  strict mode in development.
const debug = process.env.NODE_ENV !== 'production';

export function createStore () {
  return new Vuex.Store({
    strict: debug,
    state: {
      botList: [],
      currentData: {
        platformPicked: "slack",
        edit: false,
        editIndex: 0,
        step: 1,
        forms: getDefaultFormData(),
        currentChecked: 'autologin'
      },
      requestLoading: false
    },
    getters,
    mutations,
    actions
  });
}