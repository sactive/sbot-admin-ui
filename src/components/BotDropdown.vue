<template>
    <div class="form-group">
        <div v-show="label" class="col-sm-4 control-label">
            <label :for="elementId"
                   :title="title">
                {{title}}
            </label>
        </div>
        <div class="col-sm-1"></div>
        <div class="col-sm-1 controls">
<!--            <div :id="elementId">
                <input type="text" class="dropdown-toggle" data-toggle="dropdown" :value="selectedOption.name">
                <ul class="dropdown-menu">
                    <li v-for="option in options"><a href="javascript:void(0)" @click="handleSelect(option)">{{option.name}}</a></li>
                </ul>
            </div>-->
            <div :id="elementId" class="btn-group">
                <button type="button" class="btn dropdown-toggle" :class="{customClass}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {{selectedOption.name}} <span class="caret"></span>
                </button>
                <ul class="dropdown-menu">
                    <li v-for="option in options"><a href="javascript:void(0)" @click="handleSelect(option)">{{option.name}}</a></li>
                </ul>
            </div>
        </div>
        <div class="col-sm-6"></div>
    </div>
</template>

<script>
  export default {
    name: 'bot-dropdown',
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
      type: {
        type: String,
        default: ''
      },
      size: {
        type: String,
        default: ''
      },
      options: {
        type: Array,
        default: function () {
          return []
        }
      },
      selected: {
        type: Object,
        default: function () {
          return {name: ''}
        }
      }
    },
    data: function () {
      return {
        selectedOption: this.selected
      }
    },
    computed: {
      customClass () {
        let cs = {};
        switch (this.type) {
          case 'default':
            cs['btn-default'] = true;
            break;
          case 'primary':
            cs['btn-primary'] = true;
            break;
          case 'info':
            cs['btn-info'] = true;
            break;
          case 'success':
            cs['btn-success'] = true;
            break;
          case 'warning':
            cs['btn-warning'] = true;
            break;
          case 'danger':
            cs['btn-danger'] = true;
            break;
        }
        switch (this.size) {
          case 'lg':
            cs['btn-lg'] = true;
            break;
          case 'sm':
            cs['btn-sm'] = true;
            break;
          case 'xs':
            cs['btn-xs'] = true;
            break;
        }
        return cs;
      }
    },
    methods: {
      handleSelect: function(option) {
        this.selectedOption = option;
        this.$emit('updateOption', this.selectedOption);
      }
    }
  }
</script>

<style scoped>

</style>