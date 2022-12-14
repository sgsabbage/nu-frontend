<template>
  <div class="window">
    <div
      ref="window"
      class="window-handle"
      :style="windowStyle"
      @mousemove.self="onHandleMouseMove"
      @mouseleave="onHandleMouseLeave"
      @mousedown.self="onHandleMouseDown"
    >
      <div
        class="window-outer"
        @mousemove.self="onHandleMouseMove"
        @mousedown.self="onHandleMouseDown"
      >
        <div class="window-inner" @mouseenter="onHandleMouseLeave">
          <div class="window-title-bar-outer">
            <div class="window-title-bar-inner d-flex">
              <div
                v-if="!static"
                class="window-title-buttons-before d-flex justify-content-start"
                @mousedown.self="$emit('headermousedown', $event)"
              >
                <button class="btn btn-title" @click="toggleDropdown">
                  <i class="bi-chevron-down"></i> {{ activeCharacter?.name }}
                </button>
              </div>
              <div
                class="window-title"
                @mousedown.self="$emit('headermousedown', $event)"
                @dblclick="startEditingTitle"
              >
                <span v-if="!editingHeader">
                  {{ title }}
                </span>
                <input
                  v-else
                  ref="headerInput"
                  v-model="editTitle"
                  class="form-control header-input"
                  @focusout.self="stopEditingTitle"
                  @keyup.escape="stopEditingTitle"
                  @keyup.enter="saveTitle"
                />
              </div>
              <div
                v-if="!static"
                class="window-title-buttons-after d-flex justify-content-end"
                @mousedown.self="$emit('headermousedown', $event)"
              >
                <button class="btn btn-title" @mousedown.stop>
                  <i class="bi-gear"></i>
                </button>
                <button class="btn btn-title" @mousedown.stop>
                  <i class="bi-dash"></i>
                </button>
                <button
                  class="btn btn-title"
                  @click="$emit('windowclose')"
                  @mousedown.stop
                >
                  <i class="bi-x-octagon"></i>
                </button>
              </div>
            </div>
          </div>
          <ul
            ref="dropdown"
            class="dropdown-menu"
            :class="{ show: showDropdown }"
          >
            <li v-for="character in characters" :key="character.id">
              <a
                class="dropdown-item"
                :class="character === activeCharacter ? 'active' : ''"
                @click="switchCharacter(character)"
                >{{ character.name }}</a
              >
            </li>
          </ul>

          <div class="window-body">
            <slot name="default"> Some random text for the time being </slot>
          </div>
        </div>
        <div class="overlay" :class="{ active: !active }"> </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {
  computed,
  PropType,
  ref,
  toRefs,
  defineEmits,
  defineProps,
  watch,
} from "vue";
import { Direction } from "@/types";
import convert from "color-convert";
import { CurrentCharacterFragment } from "@/queries";

const emit = defineEmits([
  "handlemousedown",
  "headermousedown",
  "switchcharacter",
  "windowclose",
  "updatetitle",
]);
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  active: Boolean,
  activeCharacter: {
    type: Object as PropType<CurrentCharacterFragment>,
    required: true,
  },
  characters: {
    type: Array as PropType<Array<CurrentCharacterFragment>>,
    required: true,
  },
  baseColor: {
    type: String,
    default: "",
  },
  draggable: {
    type: Boolean,
    default: false,
  },
  resizeable: {
    type: Boolean,
    default: false,
  },
  static: {
    type: Boolean,
    default: false,
  },
});

const headerInput = ref<HTMLElement | null>(null);

const window = ref<HTMLElement | null>(null);
let handleDirection = ref(Direction.NONE);
const { resizeable, baseColor } = toRefs(props);
let showDropdown = ref(false);
let editingHeader = ref(false);
let editTitle = ref("");

const dropdown = ref<HTMLElement | null>(null);

const onHandleMouseMove = (e: MouseEvent) => {
  if (window.value === null || !resizeable.value) {
    return;
  }

  handleDirection.value = Direction.NONE;

  const centerX = window.value?.clientWidth / 2;
  const centerY = window.value?.clientHeight / 2;

  const cornerDegrees = (Math.atan2(centerY, centerX) * 180) / Math.PI;

  const mouseX = e.offsetX;
  const mouseY = e.offsetY;

  const xLength = mouseX - centerX;
  const yLength = mouseY - centerY;

  const mouseDegrees = (Math.atan2(yLength, xLength) * 180) / Math.PI + 180;

  const cornerWidth = 2;

  if (
    mouseDegrees > 360 - cornerDegrees - cornerWidth ||
    mouseDegrees < cornerDegrees + cornerWidth
  ) {
    handleDirection.value = Direction.WEST;
  } else if (
    mouseDegrees >= 180 - cornerDegrees - cornerWidth &&
    mouseDegrees <= 180 + cornerDegrees + cornerWidth
  ) {
    handleDirection.value = Direction.EAST;
  }

  if (
    mouseDegrees >= cornerDegrees - cornerWidth &&
    mouseDegrees <= 180 - cornerDegrees + cornerWidth
  ) {
    handleDirection.value |= Direction.NORTH;
  } else if (
    mouseDegrees >= 180 + cornerDegrees - cornerWidth &&
    mouseDegrees <= 360 - cornerDegrees + cornerWidth
  ) {
    handleDirection.value |= Direction.SOUTH;
  }
};

const cursorStyle = computed(() => {
  let cursor = "";

  if (handleDirection.value === Direction.NONE) {
    return cursor;
  }

  if ((handleDirection.value & Direction.NORTH) === Direction.NORTH) {
    cursor += "n";
  } else if ((handleDirection.value & Direction.SOUTH) === Direction.SOUTH) {
    cursor += "s";
  }

  if ((handleDirection.value & Direction.WEST) === Direction.WEST) {
    cursor += "w";
  } else if ((handleDirection.value & Direction.EAST) === Direction.EAST) {
    cursor += "e";
  }
  return cursor + "-resize";
});

const colorOverride = computed(() => {
  let overrides = {};
  if (baseColor?.value) {
    const [h, s, l] = convert.hex.hsl(baseColor.value);
    overrides = {
      "--nu-base": `hsl(${h}, ${s}%, ${l}%)`,
      "--nu-light-1": `hsl(${h}, ${s}%, ${l * 1.1}%)`,
      "--nu-light-2": `hsl(${h}, ${s}%, ${l * 1.2}%)`,
      "--nu-light-3": `hsl(${h}, ${s}%, ${l * 1.3}%)`,
      "--nu-light-4": `hsl(${h}, ${s}%, ${l * 1.4}%)`,
      "--nu-light-5": `hsl(${h}, ${s}%, ${l * 1.5}%)`,
      "--nu-dark-1": `hsl(${h}, ${s}%, ${l * 0.8}%)`,
      "--nu-dark-2": `hsl(${h}, ${s}%, ${l * 0.6}%)`,
      "--nu-dark-3": `hsl(${h}, ${s}%, ${l * 0.4}%)`,
      "--nu-dark-4": `hsl(${h}, ${s}%, ${l * 0.3}%)`,
      "--nu-dark-5": `hsl(${h}, ${s}%, ${l * 0.2}%)`,
    };
  }
  return overrides;
});

const windowStyle = computed(() => {
  let style: Record<string, string> = {};
  Object.assign(style, colorOverride.value);

  if (cursorStyle.value) {
    style.cursor = cursorStyle.value;
  }
  return style;
});

const onHandleMouseDown = (event: MouseEvent) => {
  if (!resizeable.value) {
    return;
  }
  emit("handlemousedown", { direction: handleDirection.value, event });
};

const switchCharacter = (character: CurrentCharacterFragment) => {
  showDropdown.value = false;
  emit("switchcharacter", character);
};

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

const startEditingTitle = () => {
  editingHeader.value = true;
  editTitle.value = props.title;
};

const stopEditingTitle = () => {
  editingHeader.value = false;
};

const saveTitle = (e: Event) => {
  editingHeader.value = false;
  emit("updatetitle", e.target?.value);
};

const onHandleMouseLeave = () => {
  if (!resizeable.value) {
    return;
  }
  handleDirection.value = Direction.NONE;
};

watch(headerInput, (header) => {
  if (header !== null) {
    header.focus();
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../scss/_variables";

.window-title-bar-outer {
  padding: 1px;
  border-radius: 0;
  background-color: var(--nu-dark-1);
  clip-path: $notch-top-path;
}

.window-title-bar-inner {
  font-family: "Zen Dots", monospace;
  text-align: center;
  line-height: 30px;
  border-radius: 0;
  background-color: var(--nu-dark-2);
  color: white;
  height: 30px;
  clip-path: $notch-top-path;
}

.window-body {
  height: calc(100% - 30px);
  overflow: hidden;
}

.window-inner {
  padding: 5px;
  height: 100%;
  overflow: hidden;
  background-color: var(--nu-dark-4);
  clip-path: $notch-path;
}

.window-handle {
  height: 100%;
  padding: 3px;
  background-color: rgba(0, 0, 0, 0);
}

.window-outer {
  padding: 2px;
  height: 100%;
  border-radius: 0;
  overflow: hidden;
  color: white;
  background: linear-gradient(
    to bottom right,
    var(--nu-light-4),
    var(--nu-dark-2),
    var(--nu-dark-2),
    var(--nu-dark-2),
    var(--nu-light-4)
  );
  clip-path: $notch-path;
}

.window-title-buttons-after,
.window-title-buttons-before {
  color: var(--nu-light-3);
  white-space: nowrap;
  flex-shrink: 0;
}

.window-title {
  padding: 0 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-grow: 1;
}

.window-title-buttons-before {
  .btn-title {
    padding-left: 10px;
    padding-right: 10px;
    border-right-width: 1px;
  }
}

.window-title-buttons-after {
  .btn-title {
    border-left-width: 1px;
  }
}

.btn-title {
  font-size: 1rem;
  height: 30px;
  min-width: 30px;
  border: var(--nu-dark-1) 0 solid;
  padding: 0;
  line-height: 30px;
  border-radius: 0;
  color: var(--nu-light-4);

  .window-title-buttons-before & {
    font-size: 0.6rem;
  }

  &:hover,
  &:focus {
    box-shadow: none;
    background-color: var(--nu-light-2);
    color: var(--nu-dark-2);
  }

  &:active {
    color: white;
  }
}

.overlay {
  pointer-events: none;
  background-color: black;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  width: 100%;
  height: 100%;
  transition: opacity ease 0.2s;

  &.active {
    opacity: 0.4;
  }
}

.header-input {
  border: 0;
  background-color: inherit;
  text-align: inherit;
  font-size: inherit;
  padding: inherit;
  line-height: inherit;
  box-shadow: none;
}
</style>
