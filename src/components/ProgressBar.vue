<template>
  <div class="bar-outer">
    <div class="bar-inner">
      <div class="bar-value" :style="barStyle"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from "vue";

export default defineComponent({
  name: "ProgressBar",
  props: {
    value: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },
  },

  setup(props) {
    const { value, max } = toRefs(props);
    const barStyle = computed(() => {
      return { width: (value.value / max.value) * 100 + "%" };
    });

    return {
      barStyle,
    };
  },
});
</script>

<style scoped>
.bar-outer {
  border: #004040 solid 2px;
  padding: 4px;
}
.bar-inner {
  background-color: #002020;
  width: 100%;
  height: 10px;
}
.bar-value {
  background-color: #008080;
  height: 10px;
  transition: width 1s;
}
</style>
