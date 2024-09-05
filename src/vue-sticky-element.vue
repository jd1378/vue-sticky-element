<script lang="ts">
import {
  h as vueH,
  cloneVNode as vueCloneVNode,
  withDirectives,
  type PropType,
} from 'vue';
// @ts-expect-error no types defined
import VScrollThreshold from 'v-scroll-threshold';

function cloneVNode(vnode: any, createElement: any) {
  if (vueCloneVNode) return vueCloneVNode(vnode, { ...vnode.props }); // vue 3

  // vue 2 , took from https://stackoverflow.com/questions/51065172/how-can-i-duplicate-slots-within-a-vuejs-render-function
  const clonedChildren =
    vnode.children &&
    vnode.children.map((vnode: any) => cloneVNode(vnode, createElement));

  const cloned = createElement(vnode.tag, vnode.data, clonedChildren);
  cloned.text = vnode.text;
  cloned.isComment = vnode.isComment;
  cloned.componentOptions = vnode.componentOptions;
  cloned.elm = vnode.elm;
  cloned.context = vnode.context;
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  return cloned;
}

function addDirectiveCompat(vnode: any, directives: any) {
  if (typeof withDirectives === 'function') {
    return withDirectives(vnode, directives);
  } else {
    return vnode;
  }
}

function getDirectiveCompat(instance: any) {
  const value = {
    threshold: instance.directiveThreshold,
    callback: instance.toggleStickiness,
    scrollBackThreshold: instance.scrollBackThreshold,
    scrollElement: instance.scrollElement,
  };
  const modifiers = {
    [instance.visibleOnDirection]: true,
  };
  if (typeof withDirectives === 'function') {
    return [VScrollThreshold, value, '', modifiers];
  } else {
    return {
      name: 'scroll-threshold',
      value,
      modifiers,
    };
  }
}

function isMinusZero(value: number) {
  if (Object.is(value, -0)) return true;
}

function debounce(func: (...any: any[]) => void, timeout = 500) {
  let timer: any;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      // eslint-disable-next-line prefer-spread
      func.apply(null, args);
    }, timeout);
  };
}

const evtOpts: AddEventListenerOptions & EventListenerOptions = {
  passive: true,
};

export default {
  directives: {
    'scroll-threshold': VScrollThreshold,
  },
  props: {
    visibleOnDirection: {
      type: String as PropType<'up' | 'down' | 'disabled'>,
      default: 'up',
      validator: (val: string) => ['up', 'down', 'disabled'].includes(val),
    },
    stickMode: {
      type: String as PropType<'element-end' | 'element-start'>,
      default: 'element-end',
      validator: (val: string) =>
        ['element-end', 'element-start'].includes(val),
    },
    stuckClass: {
      type: String,
      default: 'vue-sticky-element--stuck',
    },
    showClass: {
      type: String,
      default: 'vue-sticky-element--show',
    },
    hideClass: {
      type: String,
      default: 'vue-sticky-element--hide',
    },
    transitionClass: {
      type: String,
      default: 'vue-sticky-element--transition',
    },
    transitionDuration: {
      type: Number,
      default: 50,
    },
    /** how much user has to scroll back in the opposite direction before element shows again.
     * this is especially important on mobile devices, when user is holding touch on screen,
     * which causes element to show and hide multiple times in a row.
     *
     * resets on scroll in opposite direction of `visibleOnDirection`
     */
    scrollBackThreshold: {
      type: Number,
      default: 65,
    },

    /** When true, stops checking for scroll positions (essentially, does not do anything). this can help when you need to freeze and scroll the navbar. */
    skipChecks: {
      type: Boolean,
      default: false,
    },

    /** force applies the show class */
    forceShow: {
      type: Boolean,
      default: false,
    },

    /** The element to add `onscroll` event listener to instead of window. this is useful for native apps like ionic where scrolling element might not be window. this can be changed in runtime and the change will be detected, so for example you can get your element in `onMounted` [using `getScrollElement`](https://ionicframework.com/docs/api/content#getscrollelement) and you will be fine. */
    scrollElement: {
      type: Object as PropType<HTMLElement | undefined>,
      default: undefined,
    },
  },
  emits: ['stuck', 'show'],
  data() {
    return {
      navbarStuck: false,
      navbarShow: false,
      applyTransition: false,
      height: undefined,
      forceHide: false,
      observer: undefined as
        | undefined
        | ResizeObserver
        | ((...any: any[]) => void),
      lastScrollPos: undefined,
      scrollBackValue: undefined,
    };
  },
  computed: {
    alwaysStick() {
      return this.visibleOnDirection === 'disabled';
    },
    shouldApplyTransition() {
      return !this.alwaysStick;
    },
    stickWithElementStart() {
      return this.stickMode === 'element-start';
    },
    directiveThreshold() {
      if (this.stickWithElementStart) {
        return 0;
      }
      return this.height || 0;
    },
  },
  mounted() {
    const fetchHeight = () => {
      this.height = this.$el.firstElementChild?.clientHeight;
    };
    if (typeof window !== 'undefined') {
      if ('ResizeObserver' in window) {
        this.observer = new ResizeObserver(fetchHeight);
        this.observer.observe(this.$el);
      } else {
        this.observer = debounce(fetchHeight);
        (window as Window).addEventListener('resize', this.observer, evtOpts);
      }
    }
    fetchHeight();
  },
  // for vue 3
  beforeUnmount() {
    this.crossBeforeUnmount();
  },
  // for vue 2
  beforeDestroy() {
    this.crossBeforeUnmount();
  },
  methods: {
    addHide() {
      this.forceHide = true;
    },
    removeHide() {
      this.forceHide = false;
    },
    toggleStickiness(
      relativeScrollPosToElement: number,
      goingStickyDirection: boolean,
    ) {
      if (this.skipChecks) return;
      if (
        relativeScrollPosToElement < 0 ||
        isMinusZero(relativeScrollPosToElement)
      ) {
        this.navbarStuck = false;
        this.$emit('stuck', false);
        if (this.shouldApplyTransition) {
          this.$nextTick().then(() => {
            this.applyTransition = false;
          });
        }
      } else if (relativeScrollPosToElement > 0) {
        this.height = this.$el ? this.$el.clientHeight : this.height;
        this.navbarStuck = true;
        this.$emit('stuck', true);
        if (this.shouldApplyTransition) {
          this.$nextTick().then(() => {
            setTimeout(() => {
              this.applyTransition = true;
            }, this.transitionDuration);
          });
        }
      }
      if (this.navbarStuck && (goingStickyDirection || this.alwaysStick)) {
        this.navbarShow = true;
        this.$emit('show', true);
      } else {
        this.navbarShow = false;
        this.$emit('show', false);
      }
    },
    crossBeforeUnmount() {
      if (this.observer) {
        if ('disconnect' in this.observer) {
          this.observer.disconnect();
          this.observer = undefined;
        } else {
          window.removeEventListener('resize', this.observer, evtOpts);
        }
      }
    },
  },
  render(h: (...any: any[]) => void) {
    // @ts-expect-error h function is not passed to render function in vue 3
    const renderFunction = vueH ? vueH : h;
    let children;
    if ('$scopedSlots' in this) {
      // @ts-expect-error vue 2
      children = this.$scopedSlots.default();
    } else if ('$slots' in this) {
      // @ts-expect-error vue 3
      children = this.$slots.default();
    }

    if (!(children && children[0])) {
      // @ts-expect-error return null on vue 3
      return vueH ? null : h();
    }

    const child = cloneVNode(children[0], renderFunction);

    const classesToAdd = {
      'vue-sticky-element': true,
      [this.stuckClass]: this.navbarStuck,
      [this.showClass]: this.navbarShow || this.forceShow,
      [this.hideClass]: this.forceHide,
      [this.transitionClass]: this.applyTransition,
    };

    if (child.props) {
      // vue 3
      if (!child.props.class) {
        child.props.class = [];
      } else if (typeof child.props.class === 'string') {
        child.props.class = child.props.class.split(' ');
      }
      if (Array.isArray(child.props.class)) {
        child.props.class = child.props.class.reduce(
          (prev: any, current: any) => {
            prev[current] = true;
            return prev;
          },
          {},
        );
      }

      child.props.class = {
        ...child.props.class,
        ...classesToAdd,
      };

      child.props.class = Object.entries(child.props.class)
        .map(([k, v]) => (v ? k : null))
        .filter((v) => v)
        .join(' ');
    } else if (child.data) {
      // vue 2

      if (!child.data.class) {
        child.data.class = [];
      } else if (typeof child.data.class === 'string') {
        child.data.class = child.data.class.split(' ');
      }
      if (Array.isArray(child.data.class)) {
        child.data.class = child.data.class.reduce(
          (prev: any, current: any) => {
            prev[current] = true;
            return prev;
          },
          {},
        );
      }
      child.data.class = {
        ...child.data.class,
        ...classesToAdd,
      };

      child.data.class = Object.entries(child.data.class)
        .map(([k, v]) => (v ? k : null))
        .filter((v) => v)
        .join(' ');
    }

    const style: Record<string, string> = {};
    const flowFixStyle: Record<string, string> = {
      'pointer-events': 'none',
    };
    const directives = [getDirectiveCompat(this)];
    if (this.height) {
      style.height = `${this.height}px`;
      flowFixStyle.height = `${this.height}px`;
    }

    return addDirectiveCompat(
      renderFunction(
        'div',
        {
          style,
          ...(typeof withDirectives !== 'function' ? { directives } : {}),
        },
        [child, renderFunction('div', { style: flowFixStyle })],
      ),
      directives,
    );
  },
};
</script>

<style>
.vue-sticky-element {
  will-change: transform;
}
.vue-sticky-element--transition {
  transition: transform 100ms ease;
}

.vue-sticky-element--stuck {
  width: 100%;
  position: fixed !important;
  top: 0;
  transform: translateY(-100%);
  z-index: 10;
}

.vue-sticky-element--show {
  transform: translateY(0%);
}

.vue-sticky-element--hide {
  transform: translateY(-100%) !important;
}
</style>
