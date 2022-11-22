# vue-sticky-element

A simple vue sticky component wrapper that will stick to screen when scrolled past it. I made this because I found other libraries not doing what I exactly wanted.

Supports both vue-2 and vue-3

[![component in action](https://thumbs.gfycat.com/SerpentinePortlyCow-size_restricted.gif)](https://gfycat.com/serpentineportlycow)

[![Edit vue-sticky-element example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/vue-sticky-element-vue3-dzpd13?fontsize=14&hidenavigation=1&theme=dark)


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

### Default behaviour

This component wraps the default slot of it with a fixed height div and makes the element stick to top of screen (out of view) using `position: fixed` whenever user scrolls past the element completely. then shows the element again if the user scrolls up a bit with a fast transition.

if you want to change the default behaviour use the following properties

### properties

#### `visibleOnDirection` - ['up','down','disabled'], default: 'up'

should the hidden sticky element come into view when scrolling which direction ? if 'disabled' is used, element is displayed all the time

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

### Changelog

#### 1.2.5

detect child element resize and update the height accordingly

#### 1.2.4

unstuck at top of the page

#### 1.2.3

update npm tags

#### 1.2.2

fix a small issue with v-scroll-threshold directive and not passing child props to cloned element

#### 1.2.1

update readme

#### 1.2.0

add vue 3 support
`$root` events are not supported on vue 3

#### 1.1.2

Fixed incorrect usage of `visibleOnDirection` prop in ReadMe, Thanks for spotting it @emrullahtastan

#### 1.1.1

updated some dev dep packages

#### 1.1.0

- It's now possible to force hide the sticky element using `this.$root.$emit('vse::hide')` and undo using `this.$root.$emit('vse::show')`
