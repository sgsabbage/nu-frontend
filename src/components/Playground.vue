<template>
  <div class="outer" @mouseover="outerOver">
    <div class="inner" @mouseover.stop="innerOver">Inner</div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from "vue";

export default defineComponent({
  name: "Playground",
  props: {
    title: String,
    active: Boolean,
  },

  setup(props) {
    const { active } = toRefs(props);
    const outerClasses = computed(() => {
      let classes = ["window-outer"];
      return classes;
    });

    return {
      outerClasses,
      outerOver: () => {
        console.log("outer");
      },
      innerOver: () => {
        console.log("inner");
      },
    };
  },
});
</script>

<style scoped>
.outer {
  position: absolute;
  top: 100px;
  left: 100px;
  padding: 10px;
  background-color: rgba(255, 0, 0, 0);
}
.inner {
  background-color: rgba(0, 255, 0, 1);
  height: 100px;
  width: 100px;
}
</style>
