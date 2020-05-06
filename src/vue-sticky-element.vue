<script>
// took from https://stackoverflow.com/questions/51065172/how-can-i-duplicate-slots-within-a-vuejs-render-function
function cloneVNode(vnode, createElement) {
  const clonedChildren =
    vnode.children &&
    vnode.children.map((vnode) => cloneVNode(vnode, createElement));
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
export default {
  props: {
    visibleOnDirection: {
      type: String,
      default: 'up',
      validator: (val) => ['up', 'down', 'disabled'].includes(val),
    },
    stickMode: {
      type: String,
      default: 'element-end',
      validator: (val) => ['element-end', 'element-start'].includes(val),
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
      default: 100,
    },
  },
  data() {
    return {
      navbarStuck: false,
      navbarShow: false,
      applyTransition: false,
      height: undefined,
      forceHide: false,
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
  },
  mounted() {
    this.$root.$on('vse::hide', this.addHide);
    this.$root.$on('vse::show', this.removeHide);
    this.height = this.$el.clientHeight;
  },
  methods: {
    addHide() {
      this.forceHide = true;
    },
    removeHide() {
      this.forceHide = false;
    },
    toggleStickiness(relativeScrollPosToElement, goingStickyDirection) {
      if (relativeScrollPosToElement < 0) {
        this.navbarStuck = false;
        if (this.shouldApplyTransition) {
          this.$nextTick().then(() => {
            this.applyTransition = false;
          });
        }
      } else if (relativeScrollPosToElement > 0) {
        this.height = this.$el.clientHeight;
        this.navbarStuck = true;
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
      } else {
        this.navbarShow = false;
      }
    },
  },
  render(h) {
    const children = this.$slots.default;

    if (!(children && children[0])) {
      return h();
    }

    const child = cloneVNode(children[0], h);
    // Credits of few lines below goes to vue-fixed-header
    child.data = child.data || { class: '' };

    if (typeof child.data.class === 'string') {
      child.data.class = child.data.class.split(' ');
    }

    if (Array.isArray(child.data.class)) {
      child.data.class = [...child.data.class].reduce(
        (a, b) => ({ ...a, [b]: true }),
        {}
      );
    }

    child.data.class = {
      ...child.data.class,
      'vue-sticky-element': true,
      [this.stuckClass]: this.navbarStuck,
      [this.showClass]: this.navbarShow,
      [this.hideClass]: this.forceHide,
      [this.transitionClass]: this.applyTransition,
    };

    child.data.class = Object.entries(child.data.class)
      .map(([k, v]) => (v ? k : null))
      .filter((v) => v)
      .join(' ');

    // end of credit :)
    if (!child.data.style) {
      child.data.style = {};
    }

    const style = {};
    const directives = [];
    if (this.height) {
      style.height = `${this.height}px`;
      directives.push({
        name: 'scroll-threshold',
        value: {
          threshold: this.stickWithElementStart ? 0 : this.height,
          callback: this.toggleStickiness,
        },
        modifiers: {
          [this.visibleOnDirection]: true,
        },
      });
    }
    return h(
      'div',
      {
        style,
        directives,
      },
      [child]
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
