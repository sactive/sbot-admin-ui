import {
  INIT_BOT_LIST,
  ADD_BOT,
  REMOVE_BOT,
  REMOVE_ALL_BOTS,
  UPDATE_CURRENT_DATA,
  CLEAN_CURRENT_DATA,
  UPDATE_LOADING,
  UPDATE_BOT_STATUS
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
    state.currentData = Util.extend(true, {}, state.currentData, data);
  },
  [CLEAN_CURRENT_DATA](state) {
    state.currentData = Util.extend(true, {}, {
      platformPicked: "slack",
      edit: false,
      step: 1,
      forms: getDefaultFormData()
    });
  },
  [UPDATE_LOADING](state, status) {
    state.requestLoading = status;
  },
  [UPDATE_BOT_STATUS](state, index) {
    let cloneData = Util.extend(true, state.botList[index], {
      status: "Initializing"
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
  }
}