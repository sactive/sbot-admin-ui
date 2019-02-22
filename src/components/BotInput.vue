<template>
    <div class="form-group" :required="isRequired">
        <div v-show="hasLabel" class="col-sm-4 control-label">
            <label :for="elementId"
                   :title="title">
                {{title}}
            </label>
        </div>
        <div class="col-sm-1"></div>
        <div class="col-sm-7 controls">
            <input :class="{'input-error': hasError, 'input-success': hasSuccess}"
                   :type="type"
                   :id="elementId"
                   :key="elementId"
                   :name="name"
                   :value="currentValue"
                   :placeholder="placeholder"
                   :disabled="disabled"
                   :readonly="readonly"
                   @blur="handleBlur"
                   @change="handleChange"
                   @input="handleInput">
            <div v-show="isDisplay" class="alert"
                 :class="{'alert-error': hasError, 'alert-success': hasSuccess}"
                 role="alert">
                {{helpMessage}}
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "bot-input",
    props: {
      type: {
        validator (value) {
          return ['text', 'password', 'url', 'email'].includes(value);
        },
        default: 'text'
      },
      value: {
        type: [String, Number],
        default: ''
      },
      name: {
        type: String
      },
      title: {
        type: String,
        default: function () {
          return this.name;
        }
      },
      elementId: {
        type: String
      },
      tip: {
        type: String,
        default: function () {
          return `${this.name.toUpperCase()} is required.`;
        }
      },
      placeholder: {
        type: String,
        default: function () {
          return this.tip;
        }
      },
      disabled: {
        type: Boolean,
        default: false
      },
      readonly: {
        type: Boolean,
        default: false
      },
      required: {
        type: [String, Boolean],
        default: "required"
      },
      test: {
        type: Function,
        default: function (value) {
          if ((this.required === "required" || this.required === true) && value.trim() === "") {
            return {
              status: false,
              message: this.tip !== '' ? this.tip : `${this.name.toUpperCase()} is required.`
            };
          }
          return {
            status: true,
            message: ""
          };
        }
      },
      label: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      isRequired () {
        return this.required ? "required" : false;
      }
    },
    data: function () {
      return {
        currentValue: this.value,
        hasLabel: this.label,
        isDisplay: false,
        hasError: false,
        hasSuccess: false,
        helpMessage: ""
      }
    },
    methods: {
      handleBlur (event) {
        this.handleValidate(event.target.value);
      },
      handleChange (event) {
        this.handleValidate(event.target.value);
      },
      handleInput (event) {
        let value = event.target.value;
        this.handleValidate(value);
        this.$emit('input', value);
        this.setCurrentValue(value);
      },
      handleValidate(value) {
        let self = this;
        let result = self.test(value);
        if (self.required === "required" || self.required === true) {
          self.isDisplay = true;
        } else {
          self.isDisplay = false;
          self.hasError = false;
          self.helpMessage = "";
          if (!value || value === '') {
            return true;
          }
        }
        if (result === true || result.status) {
          self.hasSuccess = true;
          self.hasError = false;
          self.helpMessage = "";
          return true;
        }
        self.hasSuccess = false;
        self.hasError = true;
        self.helpMessage = result.message || self.tip || "";
        return false;
      },
      setCurrentValue (value) {
        if (value === this.currentValue) return;
        this.currentValue = value;
      },
    }
  }
</script>

<style scoped>

</style>