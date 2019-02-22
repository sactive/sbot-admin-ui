import {
  INIT_BOT_LIST,
  ADD_BOT,
  REMOVE_BOT,
  UPDATE_BOT_STATUS
} from "./mutation_types";
import * as api from "../api";

export default {
  async getBotList({commit}) {
    let result = await api.getBots();
    if (result.code === 200) {
      commit(INIT_BOT_LIST, result.data);
    }
    return result;
  },
  async check({commit, state}) {
    return await api.checkConnection(state.currentData);
  },
  async addBot({commit}, current) {
    let submitResult = await api.addBot(current);
    if (submitResult.code === 200) {
      commit(ADD_BOT, submitResult.data);
    }
    return submitResult;
  },
  async removeBot({commit, state}, index) {
    let deleteResult = await api.deleteBot(index, state.botList);
    if (deleteResult.code === 200) {
      commit(REMOVE_BOT, index);
    }
    return deleteResult;
  },
  async getBot({commit, state}, option) {
    let result = await api.getBot(option.index, state.currentData);
    if (result.code === 200) {
      if (option.edit) {
        result.data.step = 2;
        result.data.edit = option.edit;
        result.data.editIndex = option.index;
      }
      if(option.copy) {
        result.data.step = 2;
        result.data.copy = option.copy;
      }
    }
    return result;
  },
  async getContents({commit}, bot) {
    return await api.getContents(bot);
  },
  async stopBot({commit, state}, index) {
    let result = await api.stopBot(index, state.botList);
    if (result.code === 200) {
      commit(UPDATE_BOT_STATUS, index);
    }
    return result;
  },
  async restartBot({commit, state}, index) {
    let result = await api.restartBot(index, state.botList);
    if (result.code === 200) {
      commit(UPDATE_BOT_STATUS, index);
    }
    return result;
  },
}