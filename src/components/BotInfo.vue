<template>
    <div id="botInfoModal" class="modal fade modal-info" role="dialog" aria-hidden="true" data-backdrop="static">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title" id="botInfoLabel">Bot information</h3>
                </div>
                <div class="modal-body">
                    <a v-if="platform === 'msteams'" @click="handleDownload(current.HUBOT_NAME)" href="javascript:void(0)">Download manifest</a>
                    <p></p>
                    <p v-for="(item, index) in forms[platform]" v-show="!index.endsWith('VAULT_KEY')">
                      {{item.title}} {{current[index]}}
                    </p>
                    <p v-show="current.EXTERNAL_ACCESS_HOST">Bot external access host: {{current.EXTERNAL_ACCESS_HOST}}</p>
                    <p v-show="current.EXTERNAL_ACCESS_PORT">Bot external access port: {{current.EXTERNAL_ACCESS_PORT}}</p>
                    <p v-show="current.DEPLOYMENT_NAME && current.status.toLowerCase() !== 'stopped'">Bot deployment name: {{current.DEPLOYMENT_NAME}}</p>
                </div>
                <div class="modal-footer">
                    <button id="yesButton" class="btn btn-flat btn-primary" data-dismiss="modal">OK</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import $$ from "../lib/utils";
  import {downloadFile} from "../api";

  export default {
    name: "bot-info",
    props: {
      current: {
        type: Object,
        default: function () {
          return {

          };
        }
      }
    },
    computed: {
      platform: {
        get () {
          let temp = this.current.platform;
          if (temp === "Microsoft Teams") {
            return "msteams";
          }
          if (temp === "Slack") {
            return "slack";
          }
          if (temp === "Mattermost") {
            return "mattermost";
          }
        }
      }
    },
    data: function () {
      return {
        forms: this.$store.state.currentData.forms
      }
    },
    methods: {
      async handleDownload(botName) {
        let url = "/sbot/config/bots/" + botName + "/platform/msteams/download";
        await downloadFile(url, "manifest.zip");
      }
    }
  }
</script>

<style scoped>

</style>