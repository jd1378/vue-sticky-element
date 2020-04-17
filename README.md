# vue-sticky-element

A simple vue sticky component wrapper that will stick to screen when scrolled past it. I made this because I found other libraries not doing what I exactly wanted.

[![component in action](https://thumbs.gfycat.com/SerpentinePortlyCow-size_restricted.gif)](https://gfycat.com/serpentineportlycow)


[![Edit vue-sticky-element example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/nostalgic-dream-0cowy?fontsize=14&hidenavigation=1&theme=dark)

## usage

```bash
npm install vue-sticky-element
# or 
yarn add vue-sticky-element
```

then add it to your vue application:

```js
// add it to your vue application:
import VStickyElement from 'vue-sticky-element';
import Vue from 'vue';

Vue.use(VStickyElement);

// or you can do this as well, but you should also add the v-scroll-threshold directive to your app, because its a dependency for this component:

import StickyElement from 'vue-sticky-element';

export default {
  components: {
    StickyElement
  }
}
```

then use it: 

```html
<template>
  <div > 
    <!-- 
      .
      .
      .
     -->
     <StickyElement> 
       <Nav>...</Nav>
     </StickyElement>
    
  </div>
</template>
```

### Important Note

This component uses [scroll-threshold](https://www.npmjs.com/package/v-scroll-threshold) under the hood, make sure it is installed with it's default name if you are importing this component directly

### Default behaviour

This component wraps the default slot of it with a fixed height div and makes the element stick to top of screen (out of view) using `position: fixed` whenever user scrolls past the element completely. then shows the element again if the user scrolls up a bit with a fast transition.

if you want to change the default behaviour use the following properties

### properties

#### `visibleOnDirection` - ['up','down','all'], default: 'up'

should the hidden sticky element come into view when scrolling which direction ? if 'all' is used, element is displayed all the time

#### `stickMode` - ['element-start', 'element-end'], default: 'element-end'

should the element stick when element is out of view completely or as soon as it reaches the top of screen ?

#### `stuckClass` - default: 'vue-sticky-element--stuck'

the class that is applied when the element is stuck

#### `showClass` - default: 'vue-sticky-element--show'

the class that is applied whenn the element should be moved into view (related to visibleOnDirection)

#### `transitionClass` - default: 'vue-sticky-element--transition'

the class that is applied whenn the element is being moved into or out of view

#### `transitionDuration` - default: 100

the transition duration of move transform. this is to wait before applying transition class, so the navbar doesn't glitch into screen when it's getting stuck.
this should be the same amount of your transition duration if a custom class is used instead of the default one. changing this does not change the speed of navbar transition.

### Credits

small part of the codes used in this component were taken from [vue-fixed-header](https://www.npmjs.com/package/vue-fixed-header) and [this answer on stackoverflow](https://stackoverflow.com/questions/51065172/how-can-i-duplicate-slots-within-a-vuejs-render-function) with some edits

Thank you if you are reading this