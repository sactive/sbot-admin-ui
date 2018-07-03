<template>
    <div :id="elementId" class="modal fade" :class="alertType" role="dialog" aria-hidden="true" data-backdrop="static">
        <div class="modal-dialog" :class="alertSize">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title" id="botInfoLabel">{{title}}</h3>
                </div>
                <div class="modal-body">
                    <slot></slot>
                </div>
                <div class="modal-footer">
                    <button @click="yesHandler" :class="yesBtn.class" data-dismiss="modal">{{yesBtn.msg}}</button>
                    <button v-if="cancelBtn" @click="cancelHandler" :class="cancelBtn.class" data-dismiss="modal">{{cancelBtn.msg}}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "bot-alert",
    props: {
      elementId: {
        type: String,
        default: "botAlertModal"
      },
      type: {
        type: String,
        default: ""
      },
      title: {
        type: String,
        default: ""
      },
      yesBtn: {
        type: Object,
        default: function () {
          return {
            class: {
              btn: true,
              'btn-flat': true,
              'btn-default': true
            },
            msg: "OK"
          }
        }
      },
      cancelBtn: {
        type: Object
      },
      yesHandler: {
        type: Function,
        default: function () {

        }
      },
      cancelHandler: {
        type: Function,
        default: function () {

        }
      },
      size: {
        type: String,
        default: ""
      }
    },
    computed: {
      alertType () {
        return (this.type === "warning" && "modal-warning") || (this.type === "error" && "modal-error") || (this.type === "info" && "modal-info") || "";
      },
      alertSize () {
        return (this.size === "lg" && "modal-lg") || (this.size === "xlg" && "modal-xlg") || "";
      }
    }
  }
</script>

<style scoped>

</style>