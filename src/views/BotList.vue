<template>
    <div class="qtm-padding-box-md">
        <table class="table">
            <tbody>
                <tr>
                    <th style="width: 64px;">#</th>
                    <th>Name</th>
                    <th>Platform</th>
                    <th>Status</th>
                    <th>REST API</th>
                    <th>Actions</th>
                </tr>
                <tr v-for="(bot, index) in botsInfo">
                    <td>{{index + 1}}</td>
                    <td>
                        <a @click="current = bot" data-toggle="modal" href="#botInfoModal">{{bot.HUBOT_NAME}}</a>
                    </td>
                    <td>{{bot.platform}}</td>
                    <td>{{bot.status}}</td>
                    <td class="botlist-text">
                        <a v-show="bot.status.toLowerCase() === 'running'" :href="bot.restApi" target="_blank" :title="bot.restApi">{{bot.restApi}}</a>
                        <p v-show="bot.status.toLowerCase() !== 'running'">{{bot.restApi}}</p>
                    </td>
                    <td>
                        <div class="btn-toolbar" role="toolbar">
                            <button
                                    :disabled="bot.status.toLowerCase() !== 'running'"
                                    @click="handleContent(bot)"
                                    type="button"
                                    class="btn btn-secondary"
                                    title="Upload content package">
                                <i class="qtm-font-icon qtm-icon-folder" aria-hidden="true"></i>
                            </button>
                            <button
                                    :disabled="bot.status.toLowerCase() !== 'running'"
                                    @click="handleDownloadLog(bot)"
                                    type="button"
                                    class="btn btn-secondary"
                                    title="Download running log">
                                <i class="qtm-font-icon qtm-icon-download" aria-hidden="true"></i>
                            </button>
                            <button
                                    :disabled="bot.status.toLowerCase() !== 'failed' && bot.status.toLowerCase() !== 'stopped'"
                                    @click="handleEdit(index, $event)"
                                    type="button"
                                    class="btn btn-secondary"
                                    title="Edit bot">
                                <i class="qtm-font-icon qtm-icon-edit" aria-hidden="true"></i>
                            </button>
                            <button
                                    :disabled="bot.status.toLowerCase() !== 'failed' && bot.status.toLowerCase() !== 'stopped' && bot.status.toLowerCase() !== 'running'"
                                    @click="handleCopy(index, $event)"
                                    type="button"
                                    class="btn btn-secondary"
                                    title="Copy bot">
                                <i class="qtm-font-icon qtm-icon-copy" aria-hidden="true"></i>
                            </button>
                            <button
                                    :disabled="bot.status.toLowerCase() === 'initializing' || bot.status.toLowerCase() === 'failed' || bot.status.toLowerCase() === 'stopping'"
                                    @click="toggleBot(bot, index)"
                                    type="button"
                                    class="btn btn-secondary"
                                    :title="getButtonTitle(bot.status.toLowerCase())">
                                <i v-show="bot.status.toLowerCase() === 'running'" class="qtm-font-icon qtm-icon-pause" aria-hidden="true"></i>
                                <i v-show="bot.status.toLowerCase() !== 'running'" class="qtm-font-icon qtm-icon-play" aria-hidden="true"></i>
                            </button>
                            <button
                                    :disabled="bot.status.toLowerCase() === 'initializing' || bot.status.toLowerCase() === 'stopping'"
                                    @click="handleDelete(index, $event)"
                                    type="button"
                                    class="btn btn-secondary"
                                    title="Delete bot">
                                <i class="qtm-font-icon qtm-icon-delete" aria-hidden="true"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <bot-info v-if="current" :current="current"></bot-info>
        <bot-alert
                type="info"
                elementId="successModel"
                :title="successTitle">{{successMsg}}</bot-alert>
        <bot-alert
                type="error"
                elementId="deleteAlertModel"
                title="Delete Bot?"
                :yesBtn="{class: {btn: true, 'btn-flat': true, 'btn-danger': true}, msg: 'DELETE'}"
                :cancelBtn="{class: {btn: true, 'btn-flat': true, 'btn-default': true}, msg: 'CANCEL'}"
                :yesHandler="yesHandler">Are you sure you want to permanently delete this bot?</bot-alert>
        <bot-alert
                type="error"
                elementId="deleteErrorModel"
                title="Delete failed">{{deleteContent}}</bot-alert>
        <bot-alert
                type="error"
                elementId="getErrorModel"
                title="Get bot">Get bot Information failed.</bot-alert>
        <bot-alert
                elementId="botContent"
                size="xlg"
                title="Content packages"
                :yesHandler="contentOk"
                :cancelHandler="contentCancel"
                :cancelBtn="{class: {btn: true, 'btn-flat': true, 'btn-default': true}, msg: 'CANCEL'}">
            <table v-show="packages.length" class="table table-small">
                <tbody>
                <tr>
                    <th>File</th>
                    <th>Actions</th>
                </tr>
                <tr v-for="(pack, index) in packages">
                    <td>{{pack.filename}}</td>
                    <td>
                        <div class="btn-toolbar" role="toolbar">
                            <button
                                    @click="handleDownloadPack(pack)"
                                    type="button"
                                    class="btn btn-secondary"
                                    title="Download content package">
                                <i class="qtm-font-icon qtm-icon-download" aria-hidden="true"></i>
                            </button>
                            <button
                                    @click="handleDeletePack(pack, index)"
                                    type="button"
                                    class="btn btn-secondary"
                                    title="Delete content package">
                                <i class="qtm-font-icon qtm-icon-delete" aria-hidden="true"></i>
                            </button>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
            <div>
                <input
                        style="display: none"
                        ref="fileInput"
                        type="file"
                        @change="handleUploadChange">
                <span @click.stop="handleUploadClick">
                    <Button class="btn btn-flat btn-secondary">
                        <i class="qtm-font-icon qtm-icon-folder-open qtm-icon-default" aria-hidden="true"></i>
                        Select the file to upload
                    </Button>
                </span>
            </div>
            <div  class="qtm-padding-top-md" v-if="file !== null">
                Upload file: {{ file.name }}
                <Button
                        class="btn btn-flat btn-secondary"
                        type="button"
                        @click.stop="upload">
                    Click to upload
                </Button>
            </div>
            <br>
            <div v-show="isUpload">
                {{uploadPercent}} {{uploadResponse}}
            </div>
            <div v-show="isUpload" class="progress progress-compact" style="max-width: 700px">
                <div class="progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" :style="{'width': uploadPercent}">

                </div>
            </div>
        </bot-alert>
    </div>
</template>

<script>
  import BotInfo from '../components/BotInfo.vue';
  import BotAlert from '../components/BotAlert.vue';
  import BotUpload from '../components/BotUpload.vue';
  import $$ from "../lib/utils";
  import {
    uploadFile,
    downloadFile,
    deleteContent,
    refreshBots,
    getBotByName
  } from "../api";

  export default {
    name: "bot-upload",
    components: {
      BotInfo,
      BotAlert,
      BotUpload
    },
    computed: {
      botsInfo() {
        return this.$store.getters.renderBotList;
      }
    },
    data: function () {
      return {
        botInfo: {},
        current: {},
        deleteTarget: {},
        deleteContent: "",
        successTitle: "",
        successMsg: "",
        file: null,
        packages: [],
        bot: {},
        isUpload: false,
        uploadPercent: '0%',
        uploadResponse: '',
        watchers: []
      }
    },
    methods: {
      handleDelete(index, e) {
        $("#deleteAlertModel").modal('toggle');
        this.deleteTarget = {
          target: e.currentTarget,
          index: index
        };
      },
      async yesHandler() {
        let self = this;
        self.deleteTarget.target.setAttribute("disabled", "disabled");
        let result = await self.$store.dispatch('removeBot', self.deleteTarget.index);
        if (result.code !== 200) {
          self.deleteContent = result.msg;
          $("#deleteErrorModel").modal('toggle');
        } else {
          self.successTitle = "Delete bot successfully";
          self.successMsg = result.msg || "";
          $("#successModel").modal('toggle');
        }
        self.deleteTarget.target.removeAttribute("disabled");
      },
      async toggleBot(bot, index) {
        let self = this;
        let result = null;
        if (bot.status.toLowerCase() === 'running') {
          result = await self.$store.dispatch('stopBot', index);
          bot.status = 'Stopping';
        } else {
          result = await self.$store.dispatch('restartBot', index);
          bot.status = 'Initializing';
        }
        self.watchers.push(bot);
      },
      async handleEdit(index, e) {
        let self = this;
        e.target.setAttribute("disabled", "disabled");
        let result = await self.$store.dispatch('getBot', {index: index, edit: true});
        if (result.code !== 200) {
          return $("#getErrorModel").modal('toggle');
        }
        e.target.removeAttribute("disabled");
        //self.$parent.show = 2;
        self.$router.push({path: "/chatops/config/add", query: {loginId: $$.getQuery("loginId")}});
        self.$store.commit("updateCurrentData", result.data);
      },
      async handleCopy(index, e) {
        let self = this;
        e.target.setAttribute("disabled", "disabled");
        let result = await self.$store.dispatch('getBot', {index: index, copy: true});
        if (result.code !== 200) {
          return $("#getErrorModel").modal('toggle');
        }
        e.target.removeAttribute("disabled");
        self.$router.push({path: "/chatops/config/add", query: {loginId: $$.getQuery("loginId")}});
        let platform = result.data.platformPicked;
        result.data.forms[platform]['HUBOT_NAME'].value = '';
        let forms = this.$store.state.currentData.forms;
        for (let key in forms[platform]) {
          if(forms[platform][key].type === 'password') {
            result.data.forms[platform][key].value = '';
          }
        }
        self.$store.commit("updateCurrentData", result.data);
      },
      async handleContent(bot) {
        let self = this;
        let result = await self.$store.dispatch('getContents', bot);
        if (result.code !== 200) {
          return $("#getErrorModel").modal('toggle');
        }
        self.packages = result.data;
        let platform = (bot.platform === "Microsoft Teams" && "msteams") || (bot.platform === "Mattermost" && "mattermost") || (bot.platform === "Slack" && "slack") || bot.platform;
        self.bot = {platform: platform, name: bot.HUBOT_NAME};
        $("#botContent").modal('toggle');
      },
      contentOk() {
        let self = this;
        self.isUpload = false;
        self.uploadPercent = '0%';
        self.file = null;
        self.packages = [];
        self.uploadResponse = '';
      },
      contentCancel() {
        let self = this;
        self.contentOk();
      },
      handleUploadClick () {
        this.uploadPercent = '0%';
        this.uploadResponse = '';
        this.$refs.fileInput.click();
      },
      handleUploadChange (event) {
        let file = event.target.files[0];
        if (!file) {
          return;
        }
        this.file = file;
        this.$refs.fileInput.value = null;
      },
      async handleDeletePack (pack, index) {
        let result = await deleteContent(pack);
        if (result.code === 200) {
          return this.packages.splice(index, 1);
        }
        alert(result.data);
      },
      async handleDownloadPack (pack) {
        let url = `/chatops-chatbot/urest/v1/${pack.platform}/${pack.botname}/content/${pack.filename}`;
        await downloadFile(url, pack.filename, pack);
      },
      async upload () {
        let self = this;
        self.isUpload = true;
        let result = await uploadFile(self.file, self.bot, function (progressEvent) {
          let loaded = progressEvent.loaded;
          let total = progressEvent.total;
          self.$nextTick(() =>{
            self.uploadPercent = (loaded/total) * 100 + "%";
          })
        });
        if (result.code === 200) {
          self.packages.push({filename: self.file.name, platform: self.bot.platform, botname: (self.bot.HUBOT_NAME || self.bot.name || self.bot.botname)});
          self.uploadResponse = 'Upload successfully!';
        } else {
          self.uploadResponse = `Failed, reason: ${result.data}`;
        }
        self.file = null;
      },
      getButtonTitle(status) {
        if (status === "running") {
          return "Stop bot";
        }
        return "Start bot";
      },
      async handleDownloadLog (bot) {
        let platform = (bot.platform === "Microsoft Teams" && "msteams") || (bot.platform === "Mattermost" && "mattermost") || (bot.platform === "Slack" && "slack") || bot.platform;
        let url = `/chatops-chatbot/urest/v1/${platform}/${bot.HUBOT_NAME}/log`;
        await downloadFile(url, `${bot.HUBOT_NAME}.run.log`, {botname: bot.HUBOT_NAME, platform: platform});
      },
      async setWatchers() {
        let self = this;
        let result = await refreshBots();
        self.$store.commit('initBotList', result.data);
        self.watchers = self.getNotRunningBots(result.data);
      },
      async updateWatchBotsStatus() {
        let self = this;
        let needUpdateBots = [];
        let watchersCopy = [];
        if(self.watchers.length > 0) {
          let promises = self.watchers.map((bot) => getBotByName(bot.HUBOT_NAME, bot.platform));
          let results = await Promise.all(promises);
          $$.each(results, function (result, index) {
            if (self.watchers[index].status.toLowerCase() !== result.data.status.toLowerCase()) {
              needUpdateBots.push(result.data);
            }
          });
          $$.each(results, function (result, index) {
            if (result.data && (result.data.status.toLowerCase() !== 'running' && result.data.status.toLowerCase() !== 'stopped')) {
              watchersCopy.push(self.watchers[index]);
            }
          });
          self.watchers = watchersCopy;
          if (needUpdateBots.length > 0) {
            self.$store.commit('refreshBots', needUpdateBots);
          }
        }
      },
      getNotRunningBots(botList) {
        let result = [];
        $$.each(botList, function (bot) {
          if(bot.status.toLowerCase() !== 'running' && bot.status.toLowerCase() !== 'stopped') {
            result.push(bot);
          }
        });
        return result;
      }
    },
    mounted () {
      let self = this;
      self.$store.dispatch('getBotList')
        .then((res) => {
          self.watchers = self.getNotRunningBots(res.data);
          setInterval(self.setWatchers, 30 * 60 * 1000);
          setInterval(self.updateWatchBotsStatus, 8000);
        });
    }
//    beforeRouteUpdate() {
//      this.$store.dispatch('getBotList');
//    }
  }

</script>

<style scoped>

</style>
