<template>
    <div>
        <div>
            <div @click="handleClick">
                <input
                        ref="fileInput"
                        type="file"
                        :multiple="multiple"
                        @change="handleChange">
                <slot></slot>
            </div>
        </div>
        <slot name="tip"></slot>
    </div>

</template>

<script>
  export default {
    name: "bot-upload",
    props: {
      action: {
        type: String,
        required: true
      },
      multiple: {
        type: Boolean,
        default: false
      },
    },
    methods: {
      handleClick () {
        this.$refs.fileInput.click();
      },
      handleChange (event) {
        const files = event.target.files;
        if (!files) {
          return;
        }
        //this.uploadFiles(files);
        //this.$refs.fileInput.value = null;
      }
    }
  }
</script>

<style scoped>

</style>