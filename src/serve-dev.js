import Vue from 'vue';
import Dev from '@/serve-dev.vue';
import VScrollThreshold from 'v-scroll-threshold';

Vue.use(VScrollThreshold);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(Dev),
}).$mount('#app');
