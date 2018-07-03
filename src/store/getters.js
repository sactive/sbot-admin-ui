import Util from "../lib/utils";

function renderBotList(state) {
  let renderList = Util.clone(state.botList);
  return renderList.map(function (item) {
    if (item.platform === "msteams") {
      item.platform = "Microsoft Teams";
    }
    if (item.platform === "slack") {
      item.platform = "Slack";
    }
    if (item.platform === "mattermost") {
      item.platform = "Mattermost";
    }
    return item;
  });
}

export default {
  renderBotList
}