<template>
  <div v-if="data" style="height: 100%">
    <svg v-for="area in data.areas" :key="area.id" style="height: 100%" viewBox="-200 -200 500 1000">
      <template v-for="room in area.rooms" :key="room.id">
        <line v-for="exit in room.exits" :key="exit.id" :x1="room.x * 80" :y1="room.y * 80" :x2="exit.endRoom.x * 80" :y2="exit.endRoom.y * 80" :stroke="(hoverRoom === room.id || hoverRoom === exit.endRoom.id) ? '#fff' : '#666'" stroke-width="5" :stroke-dasharray="(exit.secret) ? 4 : 0" />
      </template>
      <template v-for="room in area.rooms" :key="room.id">
        <rect
          width="40"
          height="40"
          :x="room.x * 80 - 20"
          :y="room.y * 80 - 20"
          :fill="(hoverRoom === room.id) ? '#fff' : '#666'"
          @mouseover="hoverRoom = room.id"
          @mouseleave="hoverRoom = null"
        />
        <text
          v-if="hoverRoom === room.id"
          :x="room.x * 80"
          :y="room.y * 80 + 25"
          dominant-baseline="hanging"
          text-anchor="middle"
          fill="#fff"
          stroke="black"
          paint-order="stroke"
          stroke-width="2"
        >
          {{ room.name }}
        </text>
      </template>
    </svg>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import { CurrentCharacter } from "@/types";
import { useGetAreasQuery } from "@/queries";

export default defineComponent({
  name: "Map",
  props: {
    character: {
      type: Object as () => CurrentCharacter,
      required: true,
    },
  },
  setup() {
    const { data } = useGetAreasQuery();
    const hoverRoom = ref<string | null>(null)
    return {
      data,
      hoverRoom
    };
  },
});
</script>

<style scoped lang="scss">
</style>
