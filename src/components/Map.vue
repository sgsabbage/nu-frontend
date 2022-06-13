<template>
  <div v-if="data" style="height: 100%">
    <svg
      ref="mapEl"
      style="height: 1000px; width: 1000px"
      :viewBox="viewBox"
      @wheel="zoom"
      @mousedown="startPan"
    >
      <template v-for="room in data.areas[0].rooms" :key="room.id">
        <line
          v-for="exit in room.exits"
          :key="exit.id"
          :x1="room.x * zoomGap"
          :y1="room.y * zoomGap"
          :x2="exit.endRoom.x * zoomGap"
          :y2="exit.endRoom.y * zoomGap"
          :stroke="
            hoverRoom === room.id || hoverRoom === exit.endRoom.id
              ? '#fff'
              : '#666'
          "
          stroke-width="5"
          :stroke-dasharray="exit.secret ? 4 : 0"
        />
      </template>
      <g
        v-for="room in data.areas[0].rooms"
        :key="room.id"
        :transform="
          'translate(' + room.x * zoomGap + ' ' + room.y * zoomGap + ')'
        "
      >
        <rect
          width="40"
          height="40"
          x="-20"
          y="-20"
          :fill="hoverRoom === room.id ? '#fff' : '#666'"
          @mouseover="hoverRoom = room.id"
          @mouseleave="hoverRoom = null"
        />
        <g v-if="room.characters.length > 0" transform="translate(10 -30)">
          <circle r="10" cx="10" cy="10" fill="#fff" stroke="#fff" />
          <text
            y="10"
            x="10"
            text-anchor="middle"
            fill="#f00"
            dominant-baseline="middle"
          >
            {{ room.characters.length }}
          </text>
        </g>
        <g
          v-if="hoverRoom === room.id && room.characters.length > 0"
          :transform="
            'translate(20 ' + -20 * (room.characters.length + 1) + ')'
          "
        >
          <rect
            v-if="roomText.length > 0"
            :width="roomText[0].getBBox().width + 10"
            :height="roomText[0].getBBox().height + 10"
            fill="#0f0"
          />
          <text
            ref="roomText"
            :y="15"
            dominant-baseline="middle"
            text-anchor="left"
          >
            <tspan
              v-for="(char, index) in room.characters"
              :key="char.id"
              :dy="index == 0 ? 0 : 20"
              x="5"
            >
              {{ char.name }}
            </tspan>
          </text>
        </g>

        <text
          v-if="hoverRoom === room.id"
          y="25"
          dominant-baseline="hanging"
          text-anchor="middle"
          fill="#fff"
          stroke="black"
          paint-order="stroke"
          stroke-width="2"
        >
          {{ room.name }}
        </text>
      </g>
    </svg>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { CurrentCharacter } from "@/types";
import { useQuery } from "@vue/apollo-composable";
import { GetAreasDocument } from "@/queries";

const props = defineProps({
  character: {
    type: Object as () => CurrentCharacter,
    required: true,
  },
});

const { result: data } = useQuery(GetAreasDocument);
const hoverRoom = ref<string | null>(null);
const roomText = ref<SVGGraphicsElement[]>([]);
const mapEl = ref<HTMLElement | null>(null);
const maxZoom = 10;
const minZoom = 3;
const zoomLevel = ref(5);
const viewTop = ref(0);
const viewLeft = ref(0);

const zoomGap = computed(() => 80 / (5 / zoomLevel.value));

const zoom = (e: WheelEvent) => {
  let zoom = e.deltaY / 100;
  zoomLevel.value += zoom;
  if (zoomLevel.value < minZoom) {
    zoomLevel.value = minZoom;
  } else if (zoomLevel.value > maxZoom) {
    zoomLevel.value = maxZoom;
  }
  e.preventDefault();
};

const viewBox = computed(() => {
  return `${viewLeft.value} ${viewTop.value} 1000 1000`;
});

const startPan = (e: MouseEvent) => {
  document.addEventListener("mouseup", stopPan);
  document.addEventListener("mousemove", doPan);
  console.log("Start pan", e);
  return false;
};

const doPan = (e: MouseEvent) => {
  e.preventDefault();
  viewTop.value -= e.movementY;
  viewLeft.value -= e.movementX;
  console.log(e);
};

const stopPan = (e: MouseEvent) => {
  document.removeEventListener("mousemove", doPan);
  document.removeEventListener("mouseup", stopPan);
  console.log("Stop pan", e);
};
</script>

<style scoped lang="scss"></style>
