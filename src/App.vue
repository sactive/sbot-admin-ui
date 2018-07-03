<template>
    <div>
        <header>
            <nav class="navbar navbar-default">
                <div class="navbar-body">
                    <p class="header-title">Sbot CONFIGURATION</p>
                </div>
            </nav>
        </header>
        <div class="container qtm-margin-top-xl">
            <div class="panel panel-default">
                <div class="panel-body">
                    <ul class="nav nav-tabs nav-primary" role="tablist">
                        <li role="presentation" :class="{active: show === 1}" @click="handleNavClick('list')">
                            <router-link :to="{path: '/sbot/config/list', query: query}"><h2>My Bots</h2></router-link>
                        </li>
                        <li role="presentation" :class="{active: show === 2}" @click="handleNavClick('add')">
                            <router-link :to="{path: '/sbot/config/add', query: query}"><h2>Add Bots</h2></router-link>
                        </li>
                    </ul>
                    <router-view></router-view>
                </div>
            </div>
        </div>
        <bot-loading :size="50" :status="LoadingStatus"></bot-loading>
    </div>

</template>

<script>
  import $$ from "./lib/utils";
  import BotLoading from './components/BotLoading.vue';
  export default {
    name: "app",
    components: {
      BotLoading
    },
    data: function () {
      return {
        show: 1,
        query: {
          loginId: ""
        }
      }
    },
    computed: {
      LoadingStatus() {
        return this.$store.state.requestLoading;
      }
    },
    methods: {
      handleNavClick(type) {
        if (type === "list") {
          return this.show = 1;
        }
        this.show = 2;
      }
    },
    mounted() {
      this.query = {loginId: $$.getQuery("loginId")};
      this.$router.push({ path: "/sbot/config/list", query: this.query});
    }
  }
</script>

<style>
    .header {
        background: #0079ef;
        color: #ffffff;
    }

    .header-title {
        float: left;
        color: #ffffff;
        font-size: 18px;
        font-weight: bold;
    }

    .botconfig-content {
        text-align: center;
        margin-top: 48px;
        padding-bottom: 48px;
    }

    .botconfig-volume {
        margin-top: 48px;
        padding-bottom: 48px;
    }

    .botconfig-radio-label {
        margin-left: 16px;
    }
    .botlist-text {
        text-overflow:ellipsis;
        max-width: 220px;
        white-space:nowrap;
        overflow:hidden;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
</style>