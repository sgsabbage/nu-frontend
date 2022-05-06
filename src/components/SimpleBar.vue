<template>
  <div ref="element">
    <div class="simplebar-wrapper">
      <div class="simplebar-height-auto-observer-wrapper">
        <div class="simplebar-height-auto-observer" />
      </div>
      <div class="simplebar-mask">
        <div class="simplebar-offset">
          <div class="simplebar-content-wrapper" ref="scrollElement">
            <div class="simplebar-content" ref="contentElement">
              <slot></slot>
            </div>
          </div>
        </div>
      </div>
      <div class="simplebar-placeholder" />
    </div>
    <div class="simplebar-track simplebar-horizontal">
      <div class="simplebar-scrollbar" />
    </div>
    <div class="simplebar-track simplebar-vertical">
      <div class="simplebar-scrollbar" />
    </div>
  </div>
</template>

<script>
import SimpleBar from "simplebar";
import { defineComponent, onMounted, ref, toRefs } from "vue";

export default defineComponent({
  name: "SimpleBar",

  setup() {
    const scrollElement = ref(null);
    const contentElement = ref(null);
    const element = ref(null);

    onMounted(() => {
      const options = SimpleBar.getOptions(element.value?.attributes);
      new SimpleBar(element.value, options);
    });

    return {
      scrollElement,
      contentElement,
      element,
    };
  },
});
</script>
