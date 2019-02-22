import {
  INIT_BOT_LIST,
  ADD_BOT,
  REMOVE_BOT,
  REMOVE_ALL_BOTS,
  UPDATE_CURRENT_DATA,
  CLEAN_CURRENT_DATA,
  UPDATE_LOADING,
  UPDATE_BOT_STATUS,
  REFRESH_BOTS
} from "./mutation_types";
import Util from "../lib/utils";
import {getDefaultFormData} from './form';

export default {
  [INIT_BOT_LIST](state, data) {
    state.botList = data;
  },
  [ADD_BOT](state, data) {
    if (state.currentData.edit) {
      return state.botList.splice(state.currentData.editIndex, 1, data);
    }
    state.botList.push(data);
  },
  [REMOVE_BOT](state, index) {
    state.botList.splice(index, 1);
  },
  [REMOVE_ALL_BOTS](state) {
    state.botList = [];
  },
  [UPDATE_CURRENT_DATA](state, data) {
    let platformPicked = data.platformPicked || state.currentData.platformPicked;
    if (data.forms) {
      Util.each(state.currentData.forms[platformPicked], (item, index) => {
        if (item.type === 'dropdown') {
          data.forms[platformPicked][index].selected = {name: data.forms[platformPicked][index].value}
        }
      })
    }

    state.currentData = Util.extend(true, {}, state.currentData, data);
  },
  [CLEAN_CURRENT_DATA](state) {
    state.currentData = Util.extend(true, {}, {
      platformPicked: "slack",
      edit: false,
      editIndex: 0,
      step: 1,
      forms: getDefaultFormData(),
      currentChecked: 'autologin'
    });
  },
  [UPDATE_LOADING](state, status) {
    state.requestLoading = status;
  },
  [UPDATE_BOT_STATUS](state, index) {
    let status = 'Initializing';
    if (state.botList[index].status.toLowerCase() === 'running') {
      status = 'Stopping';
    }
    let cloneData = Util.extend(true, state.botList[index], {
      status: status
    });

    if (cloneData.platform === "msteams") {
      cloneData.platform = "Microsoft Teams";
    }
    if (cloneData.platform === "slack") {
      cloneData.platform = "Slack";
    }
    if (cloneData.platform === "mattermost") {
      cloneData.platform = "Mattermost";
    }
    state.botList.splice(index, 1, cloneData);
  },
  [REFRESH_BOTS] (state, data) {
    Util.each(data, function (item) {
      Util.each(state.botList, function (bot, index) {
        let realPlatform = bot.platform.toLowerCase();
        if (realPlatform === 'microsoft teams') {
          realPlatform = 'msteams';
        }
        if (realPlatform === item.platform && bot.HUBOT_NAME === item.HUBOT_NAME) {
          if (item.platform === "msteams") {
            item.platform = "Microsoft Teams";
          }
          if (item.platform === "slack") {
            item.platform = "Slack";
          }
          if (item.platform === "mattermost") {
            item.platform = "Mattermost";
          }
          state.botList.splice(index, 1, item);
        }
      })
    })
  }
}