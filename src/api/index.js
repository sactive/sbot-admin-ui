import $$ from "../lib/utils";

//Simulation of the async
// function timeout(ms, data) {
//   return new Promise((resolve) => {
//     setTimeout(function () {
//       resolve(data);
//     }, ms)
//   });
// }

async function getBots() {
  return await $$.fetch({
    method: 'get',
    url: "/sbot/config/bots",
    showLoading: true
  });
}

async function getBot(index, currentData) {
  let bots = await getBots();
  if (bots.code !== 200) {
    return bots;
  }
  let bot = bots.data[index];
  let data = {
    forms: {},
    platformPicked: bot.platform,
    step: 1
  };
  data.forms[bot.platform] = {};
  for (let key in currentData.forms[bot.platform]) {
    data.forms[bot.platform][key] = {
      value: bot[key]
    }
  }

  return {code: 200, data: data};
}


async function checkConnection(currentData) {
  let checkData = {
    platform: currentData.platformPicked
  };
  for (let key in currentData.forms[currentData.platformPicked]) {
    checkData[key] = currentData.forms[currentData.platformPicked][key].value;
  }
  checkData.action = currentData.edit;
  return await $$.fetch({
    method: 'post',
    url: "/sbot/config/bots/check",
    data: checkData,
    showLoading: true
  });
}

async function deleteBot(index, bots) {
  let botName = bots[index].HUBOT_NAME;
  let platform = bots[index].platform;
  return await $$.fetch({
    method: 'delete',
    url: `/sbot/config/bots/${botName}/platform/${platform}`,
    showLoading: true
  });
}

async function addBot(currentData) {
  let bot = {
    platform: currentData.platformPicked,
    status: "Initializing"
  };
  let envData = currentData.forms[bot.platform];
  $$.each(envData, function (item, index) {
    bot[index] = item.value || "";
  });


  bot.restApi = `/sbot-chatbot/urest/v1/${bot.platform}/${bot.HUBOT_NAME}`;

  return await $$.fetch({
    method: currentData.edit && "put" || "post",
    url: "/sbot/config/bots",
    data: bot,
    showLoading: true
  });
}

async function stopBot(index, bots) {
  return await toggleBot(index, bots, false);
}

async function restartBot(index, bots) {
  return await toggleBot(index, bots, true);
}

async function toggleBot(index, bots, status) {
  let botName = bots[index].HUBOT_NAME;
  let platform = bots[index].platform;
  return await $$.fetch({
    method: 'put',
    url: `/sbot/config/bots/${botName}/platform/${platform}`,
    data: {
      status: status
    },
    showLoading: true
  });
}

async function getContents(botData) {
  let platform = (botData.platform === "Microsoft Teams" && "msteams") || (botData.platform === "Mattermost" && "mattermost") || (botData.platform === "Slack" && "slack") || botData.platform;
  let bot = $$.clone(botData);
  bot.platform = platform;
  let result = await getAuthentication(bot);
  if (result.code !== 200) {
    return result;
  }
  return await $$.fetch({
    url: `/sbot-chatbot/urest/v1/${platform}/${bot.HUBOT_NAME}/content`,
    method: 'get',
    headers: {
      'Authorization': result.data
    },
    showLoading: true
  }).then(function (data) {
    let contents = [];
    contents = _.map(data.result_info, function (item) {
      return {filename: item, platform: platform, botname: bot.HUBOT_NAME};
    });
    return {
      code: 200,
      data: contents
    }
  });
}

async function deleteContent(pack) {
  let result = await getAuthentication({HUBOT_NAME: pack.botname, platform: pack.platform});
  if (result.code !== 200) {
    return result;
  }
  return await $$.fetch({
    url: `/sbot-chatbot/urest/v1/${pack.platform}/${pack.botname}/content/${pack.filename}`,
    method: 'delete',
    headers: {
      'Authorization': result.data
    },
    showLoading: true
  }).then(function (data) {
    return {
      code: data.result_status,
      data: data.result_info
    }
  });
}

async function uploadFile(file, botData, uploadProgress) {
  let platform = (botData.platform === "Microsoft Teams" && "msteams") || (botData.platform === "Mattermost" && "mattermost") || (botData.platform === "Slack" && "slack") || botData.platform;
  let bot = $$.clone(botData);
  bot.platform = platform;
  let result = await getAuthentication(bot);
  if (result.code !== 200) {
    return result;
  }
  let form = new FormData();
  form.append("files", file);
  return await $$.fetch({
    url: `/sbot-chatbot/urest/v1/${platform}/${bot.name}/content`,
    method: 'post',
    onUploadProgress: function (progressEvent) {
      if(progressEvent.lengthComputable){
        uploadProgress(progressEvent);
      }
    },
    data: form,
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': result.data
    }
  }).then(function (data) {
    return {
      code: data.result_status,
      data: data.result_info
    }
  });
}

async function downloadFile(url, filename, pack) {
  let opts = {
    url: url,
    method: 'get',
    data: {
      filename: filename
    },
    headers: {}
  };
  if (pack) {
    let result = await getAuthentication({HUBOT_NAME: pack.botname, platform: pack.platform});
    if (result.code !== 200) {
      return result;
    }
    opts.headers['Authorization'] = result.data;
    opts.headers['Content-Type'] = 'application/gzip';
  }
  return await $$.fetch(opts);
}

async function getAuthentication(bot) {
  let botName = bot.HUBOT_NAME || bot.name || bot.botname;
  let platform = (bot.platform === "Microsoft Teams" && "msteams") || (bot.platform === "Mattermost" && "mattermost") || (bot.platform === "Slack" && "slack") || bot.platform;
  return await $$.fetch({
    method: 'get',
    url: `/sbot/config/bots/${botName}/platform/${platform}/authentication`
  });
}

export {
  getBots,
  checkConnection,
  deleteBot,
  addBot,
  getBot,
  stopBot,
  restartBot,
  getAuthentication,
  getContents,
  uploadFile,
  downloadFile,
  deleteContent
}
