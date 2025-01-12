# Changelog

## 2.0.4

- add type declarations for vue export

## 2.0.3

- fix an issue where content would jump when navbar was stuck

## 2.0.2

- update v-scroll-threshold dependency to fix a small issue with scrollBackThreshold

## 2.0.1

- update v-scroll-threshold dependency to fix the issue of disappearing navbar when the page first time loads and top of screen is inside navbar threshold.

## 2.0.0

- migrated project to typescript
- removed `vse::hide` and `vse::show`
- BREAKING CHANGE: now you have to manually import css classes when using default export, OR you can opt in to use `vue-sticky-element/vue`

## 1.7.0

add `scrollElement` prop.

## 1.6.0

add `forceShow` prop.

## 1.5.0

add `skipChecks` prop.

## 1.4.0

add `show` and `stuck` events.

## 1.3.0

add `scrollBackThreshold` to fix issue on touch screens.

## 1.2.5

detect child element resize and update the height accordingly

## 1.2.4

unstuck at top of the page

## 1.2.3

update npm tags

## 1.2.2

fix a small issue with v-scroll-threshold directive and not passing child props to cloned element

## 1.2.1

update readme

## 1.2.0

add vue 3 support
`$root` events are not supported on vue 3

## 1.1.2

Fixed incorrect usage of `visibleOnDirection` prop in ReadMe, Thanks for spotting it @emrullahtastan

## 1.1.1

updated some dev dep packages

## 1.1.0

- It's now possible to force hide the sticky element using `this.$root.$emit('vse::hide')` and undo using `this.$root.$emit('vse::show')`
