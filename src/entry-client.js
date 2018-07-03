import { createApp } from './app';

const { app, router, store } = createApp();

// wait until router has resolved all async before hooks
// and async components...
router.onReady(() => {
  // actually mount to DOM
  app.$mount('#app')
});