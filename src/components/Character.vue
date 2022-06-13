<template>
  <div>
    {{ character?.currentRoom.name }}
    {{ character?.currentRoom.description }}
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from "vue";
import { CurrentCharacterFragment } from "@/queries";
const props = defineProps({
  character: {
    type: Object as () => CurrentCharacterFragment,
    required: true,
  },
  settings: {
    type: Object,
    required: true,
  },
  active: Boolean,
});
</script>
