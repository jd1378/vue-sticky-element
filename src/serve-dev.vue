<script>
import VueStickyElement from '@/vue-sticky-element.vue';

export default {
  components: {
    VueStickyElement,
  },
  data() {
    return {
      hideSticky: false,
    };
  },
  mounted() {
    // setTimeout(() => {
    //   this.hideSticky = true;
    // }, 1000);
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
    <vue-sticky-element v-if="!hideSticky">
      <div style="background-color: red; width: 100%; padding: 15px">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, sit quod!
        Excepturi reprehenderit maxime iste, quod illo recusandae cumque ratione
      </div>
    </vue-sticky-element>
    <div
      v-for="i in 50"
      :key="i + 'd'"
      style="margin: 1rem; background-color: #eaeaea; width: 40px; height: 40px"
    ></div>
  </div>
</template>

<style>
html {
  overflow-x: hidden;
}
body,
html {
  margin: 0;
  padding: 0;
  width: 100%;
}
</style>
