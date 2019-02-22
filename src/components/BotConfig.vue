<template>
    <div>
        <div v-if="currentStep === 1">
            <h4><strong>Choose a platform</strong></h4>
            <div class="form-group botconfig-content">
                <div class="radio inline">
                    <label>
                        <input type="radio" name="platformRadio" id="radio-slack" value="slack" v-model="platformPicked">
                        <span>Slack</span>
                    </label>
                </div>
                <div class="radio inline botconfig-radio-label">
                    <label>
                        <input type="radio" name="platformRadio" id="radio-mm" value="mattermost" v-model="platformPicked">
                        <span>Mattermost</span>
                    </label>
                </div>
                <div class="radio inline botconfig-radio-label">
                    <label>
                        <input type="radio" name="platformRadio" id="radio-mst" value="msteams" v-model="platformPicked">
                        <span>Microsoft Teams</span>
                    </label>
                </div>
            </div>
        </div>
        <div v-else>
            <h4><strong>Set up {{showPlatForm}} environment variables</strong></h4>
            <form class="form-horizontal ng-pristine ng-valid botconfig-content">
                <div v-show="platformPicked === 'slack'">
                    <bot-radio elementId="slackauthoptions" :checked="currentChecked" title="How to authorize:" :options="radioOptions" @updateCheck="handleCheck"></bot-radio>
                    <hr />
                </div>
                <bot-input v-for="(item, index) in forms[platformPicked]" v-if="item.type !== 'dropdown' && !item.authType"
                           :elementId="index"
                           :name="inputPrefix + index"
                           :title="item.title"
                           :tip="item.tip"
                           :test="item.test"
                           :type="item.type"
                           :required="item.required"
                           :placeholder="item.placeholder"
                           :value="item.value"
                           @input="handleInput(index, $event)"
                           :key="index">
                </bot-input>
                <bot-input v-for="(item, index) in forms[platformPicked]" v-if="item.type !== 'dropdown' && item.authType === currentChecked"
                           :elementId="index"
                           :name="inputPrefix + index"
                           :title="item.title"
                           :tip="item.tip"
                           :test="item.test"
                           :type="item.type"
                           :required="item.required"
                           :placeholder="item.placeholder"
                           :value="item.value"
                           @input="handleInput(index, $event)"
                           :key="index">
                </bot-input>
                <bot-dropdown v-for="(item, index) in forms[platformPicked]" v-if="item.type === 'dropdown' && !item.authType"
                              :elementId="index"
                              :options="item.options"
                              :selected="item.selected"
                              :title="item.title"
                              @updateOption="handleSelect(index, $event)"
                              :key="index">
                </bot-dropdown>
            </form>
        </div>
    </div>
</template>

<script>
  import BotInput from '../components/BotInput.vue';
  import BotDropdown from '../components/BotDropdown.vue';
  import BotRadio from '../components/BotRadio.vue';
  import utils from '../lib/utils';
  export default {
    name: "bot-config",
    components: { BotInput, BotDropdown, BotRadio },
    props: {
      currentStep: {
        type: Number,
        default: 1
      },
      inputPrefix: {
        type: String,
        default: "set-env-"
      }
    },
    data: function () {
      return {
        forms: utils.clone(this.$store.state.currentData.forms),
        radioOptions: [
          {name: 'slackoauthoption', value: 'autologin', title: 'Auto OAuth'},
          {name: 'slackoauthoption', value: 'accesstoken', title: 'OAuth Access Token'}
        ],
        currentChecked: this.$store.state.currentData.currentChecked
      };
    },
    methods: {
      handleInput (index, event) {
        let forms = this.forms;
        forms[this.platformPicked][index].value = event;
        this.$store.commit('updateCurrentData', {forms: forms});
      },
      handleSelect (index, event) {
        let forms = this.forms;
        forms[this.platformPicked][index].value = event.name;
        this.$store.commit('updateCurrentData', {forms: forms});
      },
      handleCheck (event) {
        this.currentChecked = event;
        this.$store.commit('updateCurrentData', {currentChecked: event});
      }
    },
    computed: {
      showPlatForm: function () {
        return (this.platformPicked === "msteams" && "Microsoft") || (this.platformPicked === "mattermost" && "Mattermost") || (this.platformPicked === "slack" && "Slack") || this.platformPicked;
      },
      platformPicked: {
        get () {
          return this.$store.state.currentData.platformPicked;
        },
        set (value) {
          this.$store.commit('updateCurrentData', {platformPicked: value});
        }
      }
    }
  }
</script>

<style scoped>

</style>