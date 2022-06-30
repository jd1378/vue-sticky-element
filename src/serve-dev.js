import Vue, { createApp } from 'vue';
import Dev from '@/serve-dev.vue';

if (!createApp) {
  Vue.config.productionTip = false;

  new Vue({
    render: (h) => h(Dev),
  }).$mount('#app');
} else {
  const app = createApp(Dev);
  app.config.productionTip = false;
  app.mount('#app');
}
