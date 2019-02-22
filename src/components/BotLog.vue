<template>
    <div :id="elementId" class="modal fade modal-fullscreen" role="dialog" aria-hidden="true" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title" id="botInfoLabel">{{title}}</h3>
                    <button type="button" class="close btn btn-icon btn-icon-only" data-dismiss="modal" aria-hidden="true" aria-label="Close">
                        <i class="qtm-font-icon qtm-icon-small-10 qtm-icon-close" aria-hidden="true"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "bot-log",
    props: {
      elementId: {
        type: String,
        default: "botLogModal"
      },
      title: {
        type: String,
        default: ""
      }
    },
    mounted() {
      let url = 'ws://localhost:8991';
      let wsc = new WebSocket(url);
      wsc.onopen = function () {
        console.log("Connection opened.");
      };

      wsc.onmessage = function (e) {
        console.log("Message received.");
      };
      wsc.onclose = function () {
        console.log("Connection closed.");
      };
    }
  }
</script>

<style scoped>

</style>