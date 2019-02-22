<template>
    <div class="qtm-padding-box-nm">
        <bot-config :currentStep="currentStep" inputPrefix="set-env-"></bot-config>
        <div class="qtm-margin-top-nm right-align">
            <button type="button" :disabled="backDisabled" class="btn btn-primary" @click="back">Back</button>
            <button type="button" :disabled="nextDisabled" class="btn btn-primary" @click="nextStep">
                <span v-if="!loading">{{buttonName}}</span>
                <span v-else>Loading...</span>
            </button>
        </div>
        <bot-alert
                :type="alertType"
                elementId="configAlertModel"
                :title="alertTitle">{{alertContent}}</bot-alert>
        <bot-alert
                :type="alertType"
                elementId="addSuccessModel"
                :title="alertTitle"
                :yesHandler="yesHandler">{{alertContent}}</bot-alert>
        <bot-alert
                :type="alertType"
                elementId="disclaimerCheckModal"
                :title="alertTitle"
                :yesBtn="{class: {btn: true, 'btn-flat': true, 'btn-default': true}, msg: 'I Agree'}"
                :cancelBtn="{class: {btn: true, 'btn-flat': true, 'btn-default': true}, msg: 'CANCEL'}"
                :yesHandler="handleDisclaimerCheck"
                :cancelHandler="handleCancel">
                <h4>{{disclaimerMsg}}</h4>
            <div>
                {{disclaimerContent}}
                <a href='https://github.com/RasaHQ/rasa_nlu/blob/master/LICENSE.txt' target='_blank'>RASA NLU</a>
                {{disclaimerAnd}}
                <a href='https://github.com/RasaHQ/rasa_core/blob/master/LICENSE.txt' target='_blank'>RASA Core</a>
                {{disclaimerContentLast}}
            </div>
        </bot-alert>
    </div>
</template>

<script>
  import BotConfig from '../components/BotConfig.vue';
  import BotAlert from '../components/BotAlert.vue';
  import $$ from '../lib/utils';

  export default {
    name: "bot-add",
    components: { BotConfig , BotAlert},
    data: function () {
      return {
        loading: false,
        backDisabled: true,
        nextDisabled: false,
        alertType: "error",
        alertTitle: "",
        alertContent: "",
        disclaimerMsg: "",
        disclaimerContent: "",
        disclaimerAnd: "",
        disclaimerContentLast: ""
      };
    },
    computed: {
      currentStep: {
        get () {
          return this.$store.state.currentData.step;
        },
        set (value) {
          this.$store.commit('updateCurrentData', {step: value});
        }
      },
      isEdit: {
        get () {
          return this.$store.state.currentData.edit;
        },
        set (value) {
          this.$store.commit('updateCurrentData', {edit: value});
        }
      },
      buttonName: {
        get () {
          return this.currentStep < 2 ? "Next step" : "Submit";
        }
      }
    },
    mounted () {
      let self = this;
      if (self.currentStep > 1) {
        self.backDisabled = false;
      }
      $('#configAlertModel').on('hidden.bs.modal', function(e) {
        self.alertType = "error";
      })
    },
    methods: {
      nextStep () {
        let self = this;
        self.backDisabled = false;
        self.disableBtns();
        let isEnableRasa = 'no';
        if(!self.validateInputs(self.currentStep)) {
          self.alertTitle = "Environment variables error";
          self.alertContent = "Please check your environment variables.";
          $("#configAlertModel").modal('toggle');
          return self.enableBtns();
        }

        let platform = self.$store.state.currentData.platformPicked;
        isEnableRasa = self.$store.state.currentData.forms[platform]['ENABLE_RASA_NLU'].value;
        if (self.currentStep === 2) {
          if (isEnableRasa === 'yes') {
            self.alertType = "info";
            self.alertTitle = "Disclaimer";
            self.disclaimerMsg = "If you indicate you wish to have RASA(NLU and Core) installed here, you agree to the following:";
            self.disclaimerContent = "RASA(NLU and Core) is not a part of Micro Focus Chatbots, " +
              "and Micro Focus International plc and its affiliates (\"Micro Focus\") are not the licensors of, " +
              "and make no representations and warranties about, RASA (NLU and Core). " +
              "Micro Focus is not responsible for any loss or damage arising or resulting from your use of, " +
              "or relating to, RASA(NLU and Core). The license terms RASA(NLU and Core) are available at";
            self.disclaimerAnd = " and ";
            self.disclaimerContentLast = ", and these terms shall govern with respect to RASA(NLU and Core). " +
              "Micro Focus is under no obligation to provide support for RASA(NLU and Core).";
            $("#disclaimerCheckModal").modal('toggle');
            return self.enableBtns();
          } else {
            return self.processNextStep();
          }
        }
        self.enableBtns();
        if (self.currentStep < 2) {
           self.currentStep ++;
        }
      },
      async processNextStep () {
        let self = this;
        let checkResult = null;
        let submitResult = null;
        checkResult = await self.$store.dispatch("check");
        if (checkResult.code !== 200) {
          self.alertTitle = "Check connection failed";
          self.alertContent = checkResult.msg;
          $("#configAlertModel").modal('toggle');
          return self.enableBtns();
        }
        submitResult = await self.$store.dispatch("addBot", self.$store.state.currentData);
        if (submitResult.code !== 200) {
          self.alertTitle = "Create bot failed";
          self.alertContent = submitResult.msg;
          $("#configAlertModel").modal('toggle');
          return self.enableBtns();
        }
        self.alertType = "info";
        self.alertTitle = self.$store.state.currentData.edit ? "Edit bot successfully" : "Create bot successfully";
        self.alertContent = submitResult.msg;
        $("#addSuccessModel").modal('toggle');
      },
      back () {
        let self = this;
        if (self.currentStep === 2) {
          if (self.$store.state.currentData.edit || self.$store.state.currentData.copy) {
            self.$router.push({path: "/chatops/config/list", query: {loginId: $$.getQuery("loginId")}});
          }
          self.backDisabled = true;
        }
        if (self.currentStep > 1) {
          self.currentStep --;
        }
      },
      disableBtns() {
        this.backDisabled = true;
        this.nextDisabled = true;
        this.loading = true;
      },
      enableBtns() {
        this.backDisabled = false;
        this.nextDisabled = false;
        this.loading = false;
      },
      validateInputs(step) {
        let self = this;
        let prefix = "";
        let result = false;
        let filters = [];
        if (step === 1) {
          return true;
        } else {
          prefix = "set-env-";
        }
        filters = self.$children[0].$children.filter(function (item) {
          if (item.name && item.name.startsWith(prefix) && item.handleValidate) {
            return item.handleValidate(item.value) === false;
          }
        });

        if (filters.length > 0) {
          return false;
        }

        return true;
      },
      yesHandler: function () {
        let self = this;
        self.$parent.show = 1;
        self.$router.push({path: "/chatops/config/list", query: {loginId: $$.getQuery("loginId")}});
        self.$store.commit('cleanCurrentData');
      },
      handleDisclaimerCheck: function () {
        let self = this;
        self.processNextStep();
      },
      handleCancel: function () {
        let self = this;
        self.alertType = "warning";
        self.alertTitle = "Warning";
        self.alertContent = "You cannot proceed to the next step until you agree to the disclaimer.";
        $("#configAlertModel").modal('toggle');
      }
    }
  }
</script>

<style scoped>

</style>