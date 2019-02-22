<template>
  <div class="form-group">
    <div v-show="label" class="col-sm-4 control-label">
      <label :for="elementId"
             :title="title">
        {{title}}
      </label>
    </div>
    <div class="col-sm-1"></div>
    <div class="col-sm-4 controls">
      <div class="radio inline" v-for="(item, index) in options">
        <label>
          <input :name="item.name" :id="item.name + index" :checked="checked === item.value" :value="item.value" @click="handleCheck(item.value)" type="radio">
          <span><div>{{item.title}}</div></span>
        </label>
      </div>
    </div>
    <div class="col-sm-3"></div>
  </div>
</template>

<script>
  export default {
    name: 'bot-radio',
    props: {
      elementId: {
        type: String,
        required: true
      },
      label: {
        type: Boolean,
        default: true
      },
      title: {
        type: String,
        default: ''
      },
      options: {
        type: Array,
        default: function () {
          return []
        }
      },
      checked: {
        type: String,
        default: 'autologin'
      }
    },
    methods: {
      handleCheck: function(value) {
        this.$emit('updateCheck', value);
      }
    }
  }
</script>

<style scoped>

</style>