<script>
import VueStickyElement from '@/vue-sticky-element.vue';

export default {
  components: {
    VueStickyElement,
  },
};
</script>

<template>
  <div id="app">
    <div
      v-for="i in 20"
      :key="i"
      style="margin: 1rem; background-color: #eaeaea; width: 40px; height: 40px"
    ></div>
    <vue-sticky-element>
      <div style="background-color: red; width: 100%; height: 50px">test</div>
    </vue-sticky-element>
    <div
      v-for="i in 20"
      :key="i + 'd'"
      style="margin: 1rem; background-color: #eaeaea; width: 40px; height: 40px"
    ></div>
  </div>
</template>
