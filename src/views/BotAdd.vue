<template>
    <div class="qtm-padding-box-nm">
        <bot-config :currentStep="currentStep" inputPrefix="set-env-"></bot-config>
        <div class="qtm-margin-top-nm">
            <button type="button" :disabled="backDisabled" class="btn btn-primary" @click="back">Back</button>
            <button type="button" :disabled="nextDisabled" class="btn btn-primary" @click="nextStep">
                <span v-if="!loading">Next step</span>
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
        alertContent: ""
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
      }
    },
    mounted () {
      if (this.currentStep > 1) {
        this.backDisabled = false;
      }
    },
    methods: {
      async nextStep () {
        let self = this;
        let checkResult = null;
        let submitResult = null;
        self.backDisabled = false;
        self.disableBtns();
        if(!self.validateInputs(self.currentStep)) {
          self.alertTitle = "Environment variables error";
          self.alertContent = "Please check your environment variables.";
          $("#configAlertModel").modal('toggle');
          return self.enableBtns();
        }
        if (self.currentStep === 2) {
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
        }
        self.enableBtns();
        if (self.currentStep < 2) {
          self.currentStep ++;
        }
      },
      back () {
        let self = this;
        if (self.currentStep === 2) {
          if (self.$store.state.currentData.edit) {
            self.$router.push({path: "/sbot/config/list", query: {loginId: $$.getQuery("loginId")}});
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
          if (item.name && item.name.startsWith(prefix)) {
            result = item.handleValidate(item.value);
          }
          return result === false;
        });

        if (filters.length > 0) {
          return false;
        }

        return true;
      },
      yesHandler: function () {
        let self = this;
        self.$parent.show = 1;
        self.$router.push({path: "/sbot/config/list", query: {loginId: $$.getQuery("loginId")}});
      }
    }
  }
</script>

<style scoped>

</style>