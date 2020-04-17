<script>
import Vue from 'vue';
import VueStickyElement from '@/vue-sticky-element.vue';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    VueStickyElement,
  },
});
</script>

<template>
  <div id="app">
    <div v-for="i in 20">
      <div
        style="
          margin: 1rem;
          background-color: #eaeaea;
          width: 40px;
          height: 40px;
        "
      ></div>
    </div>
    <vue-sticky-element>
      <div style="background-color: red; width: 100%; height: 50px;">
        test
      </div>
    </vue-sticky-element>
    <div v-for="i in 30">
      <div
        style="
          margin: 1rem;
          background-color: #eaeaea;
          width: 40px;
          height: 40px;
        "
      ></div>
    </div>
  </div>
</template>
