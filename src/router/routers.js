const routers = [
  {
    path: '/sbot/config/list',
    meta: {
      title: 'My Bots'
    },
    component: resolve => require.ensure([], () => resolve(require('../views/BotList.vue')), 'sbot-view')
  },
  {
    path: '/sbot/config/add',
    meta: {
      title: 'Add Bot'
    },
    component: resolve => require.ensure([], () => resolve(require('../views/BotAdd.vue')), 'sbot-view')
  },
  {
    path: '*',
    redirect: '/sbot/config/list'
  }
];


export default routers;