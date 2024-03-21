// Import vue component
import component from '@/vue-sticky-element.vue';
// @ts-expect-error doesn't matter
import thresholdPlugin from 'v-scroll-threshold';

// install function executed by Vue.use()
const install = function installVueStickyElement(Vue: any) {
  if ((install as any).installed) return;
  (install as any).installed = true;
  Vue.component('VueStickyElement', component);
  Vue.use(thresholdPlugin);
};

// Create module definition for Vue.use()
const plugin = {
  install,
};

// To auto-install when vue is found
// eslint-disable-next-line no-redeclare
/* global window, global */
let GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = (window as any).Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = (global as any).Vue;
}
if (GlobalVue && GlobalVue.use) {
  GlobalVue.use(plugin);
}

// Inject install function into component - allows component
// to be registered via Vue.use() as well as Vue.component()
component.install = install;

// Export component by default
export default component;
export { component as VueStickyElement, install };

// It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;
