# vue-sticky-element

This component can help you:

- Create a navbar that will stick to screen when scrolled past it
- Hide navbar when scrolling down and show it when scrolling back up
- Handles common bug of touch screen causing navbar to rapidly show/hide when holding your finger on screen

Supports both vue-2 and vue-3

[![Edit vue-sticky-element example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/vue-sticky-element-vue3-dzpd13?fontsize=14&hidenavigation=1&theme=dark)

## Getting Started

```bash
npm install vue-sticky-element
# or 
yarn add vue-sticky-element
```

Then add it to your vue application:

```js
// add it to your vue application:
import StickyElement from 'vue-sticky-element';
import 'vue-sticky-element/css'; // this is required for default styles to work.

export default {
  components: {
    StickyElement
  }
}

// or you can use the .vue import:
import StickyElement from 'vue-sticky-element/vue';
```

Then use it:

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

## Default behaviour

This component wraps the default slot of it with a fixed height div and makes the element stick to top of screen (out of view) using `position: fixed` whenever user scrolls past the element completely. then shows the element again if the user scrolls up a bit (adjustable by `scrollBackThreshold`) with a fast transition.

If you want to change the default behaviour use the following properties

## properties

### `visibleOnDirection` - ['up','down','disabled'], default: 'up'

Should the hidden sticky element come into view when scrolling which direction ? if 'disabled' is used, element is displayed all the time

### `stickMode` - ['element-start', 'element-end'], default: 'element-end'

Should the element stick when element is out of view completely or as soon as it reaches the top of screen ?

### `stuckClass` - default: 'vue-sticky-element--stuck'

The class that is applied when the element is stuck

### `showClass` - default: 'vue-sticky-element--show'

The class that is applied whenn the element should be moved into view (related to visibleOnDirection)

### `transitionClass` - default: 'vue-sticky-element--transition'

The class that is applied whenn the element is being moved into or out of view

### `transitionDuration` - default: 100

The transition duration of move transform. this is to wait before applying transition class, so the navbar doesn't glitch into screen when it's getting stuck.
this should be the same amount of your transition duration if a custom class is used instead of the default one. changing this does not change the speed of navbar transition.

### `scrollBackThreshold` - default: 65

When using this element as navbar, touch screen users will finding it very annoying when they hold their fingers on screen.
because normally when you put your fingers on screen, it wobbles up and down, causing scroll to move up and down multiple times in a row.
you can adjust how much user has to scroll back (along the `visibleOnDirection`) for the element to show.

### `skipChecks` - default: false

When true, stops checking for scroll positions (essentially, does not do anything). this can help when you need to freeze and scroll the navbar.

### `forceShow` - default: false

Force applies the `showClass`.

### `scrollElement` - default: undefined

The element to add `onscroll` event listener to instead of window. this is useful for native apps like ionic where scrolling element might not be window. this can be changed in runtime and the change will be detected, so for example you can get your element in `onMounted` [using `getScrollElement`](https://ionicframework.com/docs/api/content#getscrollelement) and you will be fine.

## events

### `stuck` - true | false

When stuck state changes, emits the new value

### `show` - true | false

When show state changes, emits the new value

## Credits

Small part of the codes used in this component were taken from [vue-fixed-header](https://www.npmjs.com/package/vue-fixed-header) and [this answer on stackoverflow](https://stackoverflow.com/questions/51065172/how-can-i-duplicate-slots-within-a-vuejs-render-function) with some edits

---------------

## Changelog

Check [CHANGELOG.md](https://github.com/jd1378/vue-sticky-element/blob/master/CHANGELOG.md)
