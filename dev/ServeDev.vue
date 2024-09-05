<script setup lang="ts">
import VueStickyElement from '../src/vue-sticky-element.vue';
import { ref } from 'vue';

const hideSticky = ref(false);
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
    <!-- <div
      ref="devdiv"
      style="
        max-height: 400px;
        max-width: 500px;
        border: 1px solid gray;
        margin: 30px;
        overflow-y: scroll;
        position: relative;
      "
    >
      <div
        v-for="i in 20"
        :key="i"
        style="
          margin: 1rem;
          background-color: #eaeaea;
          width: 40px;
          height: 40px;
        "
      ></div>
      <vue-sticky-element v-if="!hideSticky" :scroll-element="scrollElement">
        <div style="background-color: green; width: 100%; padding: 15px">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, sit quod!
          Excepturi reprehenderit maxime iste, quod illo recusandae cumque
          ratione
        </div>
      </vue-sticky-element>
      <div
        v-for="i in 50"
        :key="i + 'd'"
        style="
          margin: 1rem;
          background-color: #eaeaea;
          width: 40px;
          height: 40px;
        "
      ></div>
    </div> -->
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
