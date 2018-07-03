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
                <bot-input v-for="(item, index) in forms[platformPicked]"
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
            </form>
        </div>
    </div>
</template>

<script>
  import BotInput from '../components/BotInput.vue';

  export default {
    name: "bot-config",
    components: { BotInput },
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
        forms: this.$store.state.currentData.forms
      };
    },
    methods: {
      handleInput (index, event) {
        let forms = this.forms;
        forms[this.platformPicked][index].value = event;
        this.$store.commit('updateCurrentData', {forms: forms});
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