<template>
  <div class="vh-100">
    <nav
      v-if="!loading"
      class="navbar navbar-expand navbar-dark sticky-top bg-info"
    >
      <a class="navbar-brand">NuMu</a>
      <ul class="navbar-nav ml-auto">
        <li class="nav-item dropdown">
          <a
            id="navbarDropdown"
            class="nav-link dropdown-toggle"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Dropdown
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <!-- <li
              ><a
                class="dropdown-item"
                href="#"
                @click="
                  openWindow.mutate({
                    input: {
                      component: 'Channels',
                      z: 500,
                      top: 0,
                      left: 0,
                      width: 500,
                      height: 500,
                      characterId: currentPlayer?.characters[0].id,
                    },
                  })
                "
                >Action</a
              ></li
            > -->
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li>
              <div class="dropdown-divider"></div>
            </li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
      </ul>
    </nav>

    <div
      v-if="!loading"
      style="position: relative; overflow: auto; height: calc(100% - 56px)"
      class="lined-grid"
    >
      <BaseWindow
        v-for="(window, index) in [...windows].reverse()"
        :key="window.id"
        :active="index === windows.length - 1"
        :active-character="window.character || undefined"
        :characters="currentPlayer?.characters || []"
        :base-color="window.character?.baseColor || undefined"
        :title="window.name"
        :style="windowStyle(window)"
        :resizeable="true"
        :draggable="true"
        @handlemousedown="onHandleMouseDown(window, $event)"
        @headermousedown="onHeaderMouseDown(window)"
        @mousedown="onWindowMouseDown(window)"
        @windowclose="onWindowClose(window)"
        @switchcharacter="onSwitchCharacter(window, $event)"
        @updatetitle="onUpdateTitle(window, $event)"
      >
        <component
          :is="window.component"
          :character="window.character"
          :settings="windowSettings(window)"
          @updatesettings="onUpdateSettings(window, $event)"
        ></component>
      </BaseWindow>
      <div
        v-if="snapHorizontal"
        class="snap snap-horizontal"
        :style="{ top: snapHorizontalLoc + 'px' }"
      />

      <div
        v-if="snapVertical"
        class="snap snap-vertical"
        :style="{ left: snapVerticalLoc + 'px' }"
      />
    </div>
    <div v-if="loading" class="container-fluid">
      <div class="row justify-content-center align-content-center vh-100">
        <div class="col-4">
          <h5>Loading</h5>
          <ProgressBar :value="loadBar" :max="100" variant="info"></ProgressBar>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import BaseWindow from "../components/BaseWindow.vue";
import ProgressBar from "@/components/ProgressBar.vue";
import { computed, defineComponent, ref } from "vue";
import config from "@/config";

import gql from "graphql-tag";

import { Direction } from "@/types";
import { useQuery, useMutation, useApolloClient } from "@vue/apollo-composable";
import {
  GetMeDocument,
  GetMyWindowsDocument,
  BringWindowToFrontDocument,
  UpdateWindowNameDocument,
  UpdateWindowDocument,
  CloseWindowDocument,
  UpdateWindowLocationDocument,
  Character,
  Window,
  WindowSettingInput,
} from "@/queries";

interface WindowStyle {
  position: string;
  width: string;
  height: string;
  top: string;
  left: string;
}

enum ConnectionState {
  IDLE,
  CONNECTING,
  OPEN,
  CLOSED,
}

const DOCK_SENSITIVITY = 10;
const WINDOW_PADDING = 3;

function checkDock(val1: number, val2: number) {
  return val1 - DOCK_SENSITIVITY < val2 && val2 < val1 + DOCK_SENSITIVITY;
}

export default defineComponent({
  name: "Home",
  components: Object.assign(
    {
      ProgressBar,
      BaseWindow,
    },
    config.components
  ),
  setup() {
    const { resolveClient } = useApolloClient();
    const client = resolveClient();
    let connState = ConnectionState.IDLE;
    let connection: WebSocket | null = null;
    let loading = ref(false);
    let loadBar = ref(0);

    const doLoad = () => {
      setTimeout(() => {
        loadBar.value = 100;
      }, 100);
      setTimeout(() => {
        loading.value = false;
      }, 1500);
    };
    //doLoad();

    for (const sub of config.subscribers) {
      sub();
    }

    const windowStyle = (window: Window): WindowStyle => {
      return {
        position: "absolute",
        width: window.width + WINDOW_PADDING * 2 + "px",
        height: window.height + WINDOW_PADDING * 2 + "px",
        top: window.top - WINDOW_PADDING + "px",
        left: window.left - WINDOW_PADDING + "px",
      };
    };

    const data = useQuery(GetMeDocument);
    const { result: windowsData } = useQuery(GetMyWindowsDocument);
    const updateWindow = useMutation(UpdateWindowDocument);
    const updateWindowName = useMutation(UpdateWindowNameDocument);
    const bringWindowToFront = useMutation(BringWindowToFrontDocument, () => ({
      update: (cache, { data }) => {
        cache.writeQuery({
          query: gql`
            query getWindows {
              windows {
                id
              }
            }
          `,
          data: { windows: data?.bringWindowToFront.windows },
        });
      },
    }));
    const updateWindowLocation = useMutation(UpdateWindowLocationDocument);

    const deleteWindow = useMutation(CloseWindowDocument);
    const windows = computed(() => windowsData.value?.windows || []);

    let resizeDirection: Direction | undefined;
    let resizeWindowId = "";
    let draggedWindowId = "";

    const stopResize = () => {
      snapHorizontal.value = false;
      snapVertical.value = false;
      document.removeEventListener("mousemove", doResize);
      document.removeEventListener("mouseup", stopResize);
      const resizeWindow = windows.value.find((w) => w.id == resizeWindowId);
      if (resizeWindow) {
        updateWindowLocation.mutate({
          input: {
            id: resizeWindow.id,
            top: resizeWindow.top,
            left: resizeWindow.left,
            width: resizeWindow.width,
            height: resizeWindow.height,
          },
        });
      }
      resizeWindowId = "";
      resizeDirection = undefined;
    };

    const minWidth = 300;
    const minHeight = 300;
    let totalDrag = { top: 0, left: 0 };
    let originalLoc = { top: 0, left: 0 };
    let originalShape = { top: 0, left: 0, width: 0, height: 0 };
    let totalResize = { x: 0, y: 0 };
    const snapHorizontal = ref(false);
    const snapHorizontalLoc = ref(0);
    const snapVertical = ref(false);
    const snapVerticalLoc = ref(0);

    const doResize = (ev: MouseEvent) => {
      const resizeWindow = windows.value.find((w) => w.id == resizeWindowId);
      if (
        resizeWindow === undefined ||
        resizeDirection === undefined ||
        resizeDirection === Direction.NONE
      ) {
        return;
      }
      ev.preventDefault();

      totalResize.x += ev.movementX;
      totalResize.y += ev.movementY;

      let height = originalShape.height;
      let width = originalShape.width;
      let left = originalShape.left;
      let top = originalShape.top;

      snapHorizontal.value = false;
      snapVertical.value = false;

      if ((resizeDirection & Direction.NORTH) === Direction.NORTH) {
        height -= totalResize.y;
        top += totalResize.y;
        if (height < minHeight) {
          top -= minHeight - height;
          height = minHeight;
        }

        for (let window of windows.value.filter(
          (w) => w.id !== resizeWindow.id
        )) {
          if (checkDock(window.top, top)) {
            let newTop = window.top;
            height += top - newTop;
            top = newTop;
            snapHorizontal.value = true;
            snapHorizontalLoc.value = window.top;
            break;
          }
          if (checkDock(window.top + window.height, top)) {
            let newTop = window.top + window.height;
            height += top - newTop;
            top = newTop;
            snapHorizontal.value = true;
            snapHorizontalLoc.value = window.top + window.height - 1;
            break;
          }
        }
      } else if ((resizeDirection & Direction.SOUTH) === Direction.SOUTH) {
        height += totalResize.y;
        if (height < minHeight) {
          height = minHeight;
        }
        for (let window of windows.value.filter(
          (w) => w.id !== resizeWindow.id
        )) {
          if (checkDock(window.top + window.height, top + height)) {
            height = window.top + window.height - top;
            snapHorizontal.value = true;
            snapHorizontalLoc.value = window.top + window.height;
            break;
          }
          if (checkDock(window.top, top + height)) {
            height = window.top - top;
            snapHorizontal.value = true;
            snapHorizontalLoc.value = window.top - 1;
            break;
          }
        }
      }

      if ((resizeDirection & Direction.WEST) === Direction.WEST) {
        width -= totalResize.x;
        left += totalResize.x;
        if (width < minWidth) {
          left -= minWidth - width;
          width = minWidth;
        }

        for (let window of windows.value.filter(
          (w) => w.id !== resizeWindow.id
        )) {
          if (checkDock(window.left, left)) {
            let newLeft = window.left;
            width += left - newLeft;
            left = newLeft;
            snapVertical.value = true;
            snapVerticalLoc.value = left;
            break;
          }
          if (checkDock(window.left + window.width, left)) {
            let newLeft = window.left + window.width;
            width += left - newLeft;
            left = newLeft;
            snapVertical.value = true;
            snapVerticalLoc.value = window.left + window.width - 1;
            break;
          }
        }
      } else if ((resizeDirection & Direction.EAST) === Direction.EAST) {
        width += totalResize.x;
        if (width < minWidth) {
          width = minWidth;
        }
        for (let window of windows.value.filter(
          (w) => w.id !== resizeWindow.id
        )) {
          if (checkDock(window.left + window.width, left + width)) {
            width = window.left + window.width - left;
            snapVertical.value = true;
            snapVerticalLoc.value = window.left + window.width;
            break;
          }
          if (checkDock(window.left, left + width)) {
            width = window.left - left;
            snapVertical.value = true;
            snapVerticalLoc.value = window.left - 1;
            break;
          }
        }
      }

      if (top < 0) {
        height += top;
        top = 0;
      }

      if (left < 0) {
        width += left;
        left = 0;
      }

      client.writeQuery({
        query: gql`
          query updateSize($id: ID!) {
            window(id: $id) {
              id
              left
              top
              height
              width
            }
          }
        `,
        data: {
          window: {
            __typename: "Window",
            id: resizeWindow.id,
            top: top,
            left: left,
            height: height,
            width: width,
          },
        },
        variables: {
          id: resizeWindow.id,
        },
      });
    };

    const doDrag = (ev: MouseEvent) => {
      const draggedWindow = windows.value.find((w) => w.id == draggedWindowId);
      if (!draggedWindow) {
        return;
      }
      totalDrag.top += ev.movementY;
      totalDrag.left += ev.movementX;

      let top = originalLoc.top + totalDrag.top;
      let left = originalLoc.left + totalDrag.left;

      if (top && top < 0) {
        top = 0;
      }
      if (left && left < 0) {
        left = 0;
      }

      snapHorizontal.value = false;
      snapVertical.value = false;
      for (let window of windows.value.filter(
        (w) => w.id !== draggedWindow.id
      )) {
        if (checkDock(window.top, top)) {
          top = window.top;
          snapHorizontal.value = true;
          snapHorizontalLoc.value = window.top;
          break;
        }
        if (checkDock(window.top + window.height, top)) {
          top = window.top + window.height;
          snapHorizontal.value = true;
          snapHorizontalLoc.value = window.top + window.height - 1;
          break;
        }
        if (checkDock(window.top + window.height, top + draggedWindow.height)) {
          top = window.top + window.height - draggedWindow.height;
          snapHorizontal.value = true;
          snapHorizontalLoc.value = window.top + window.height;
          break;
        }
        if (checkDock(window.top, top + draggedWindow.height)) {
          top = window.top - draggedWindow.height;
          snapHorizontal.value = true;
          snapHorizontalLoc.value = window.top - 1;
          break;
        }
      }

      for (let window of windows.value.filter(
        (w) => w.id !== draggedWindow.id
      )) {
        if (checkDock(window.left, left)) {
          left = window.left;
          snapVertical.value = true;
          snapVerticalLoc.value = left;
          break;
        }
        if (checkDock(window.left + window.width, left)) {
          left = window.left + window.width;
          snapVertical.value = true;
          snapVerticalLoc.value = window.left + window.width - 1;
          break;
        }
        if (checkDock(window.left + window.width, left + draggedWindow.width)) {
          left = window.left + window.width - draggedWindow.width;
          snapVertical.value = true;
          snapVerticalLoc.value = window.left + window.width;
          break;
        }
        if (checkDock(window.left, left + draggedWindow.width)) {
          left = window.left - draggedWindow.width;
          snapVertical.value = true;
          snapVerticalLoc.value = window.left - 1;
          break;
        }
      }
      client.writeQuery({
        query: gql`
          query updateLocation($id: ID!) {
            window(id: $id) {
              id
              left
              top
            }
          }
        `,
        data: {
          window: {
            __typename: "Window",
            id: draggedWindow.id,
            top: top,
            left: left,
          },
        },
        variables: {
          id: draggedWindow.id,
        },
      });
      ev.preventDefault();
    };

    const stopDrag = () => {
      document.removeEventListener("mousemove", doDrag);
      document.removeEventListener("mouseup", stopDrag);
      snapHorizontal.value = false;
      snapVertical.value = false;
      const draggedWindow = windows.value.find((w) => w.id == draggedWindowId);
      if (!draggedWindow) {
        return;
      }

      updateWindowLocation.mutate({
        input: {
          id: draggedWindow.id,
          top: draggedWindow.top,
          left: draggedWindow.left,
          width: draggedWindow.width,
          height: draggedWindow.height,
        },
      });

      draggedWindowId = "";
    };

    const onWindowClose = (window: Window) => {
      deleteWindow.mutate({ input: { id: window.id } });
    };

    return {
      currentPlayer: computed(() => data.result.value?.me),
      windows,
      connState,
      connection,
      updateWindow,
      loading,
      loadBar,
      ConnectionState,
      windowStyle,
      snapHorizontal,
      snapHorizontalLoc,
      snapVertical,
      snapVerticalLoc,
      windowSettings: (window: Window): Record<string, string> => {
        const settings: Record<string, string> = {};
        for (let setting of window.settings) {
          settings[setting.key] = setting.value;
        }
        return settings;
      },
      onUpdateSettings: (window: Window, event: Record<string, string>) => {
        const settings: WindowSettingInput[] = [];
        for (let k of Object.keys(event)) {
          settings.push({
            key: k,
            value: event[k],
          });
        }
        updateWindow.mutate({
          input: {
            id: window.id,
            settings,
          },
        });
      },
      onWindowMouseDown: (window: Window): boolean => {
        if (windows.value[0] === window) {
          return true;
        }
        bringWindowToFront.mutate({
          id: window.id,
        });

        return true;
      },
      onSwitchCharacter: (window: Window, character: Character) => {
        updateWindow.mutate({
          input: {
            id: window.id,
            characterId: character.id,
          },
        });
      },
      onHandleMouseDown: (
        window: Window,
        { direction }: { direction: Direction }
      ): boolean => {
        if (direction === Direction.NONE) {
          return true;
        }
        resizeWindowId = window.id;
        resizeDirection = direction;
        totalResize = { x: 0, y: 0 };
        originalShape = {
          top: window.top,
          left: window.left,
          width: window.width,
          height: window.height,
        };
        document.addEventListener("mousemove", doResize);
        document.addEventListener("mouseup", stopResize);
        return false;
      },
      onHeaderMouseDown: (window: Window): boolean => {
        draggedWindowId = window.id;
        totalDrag = { top: 0, left: 0 };
        originalLoc = { top: window.top, left: window.left };
        document.addEventListener("mousemove", doDrag);
        document.addEventListener("mouseup", stopDrag);
        return true;
      },
      onWindowClose,
      onUpdateTitle: (window: Window, title: string): void => {
        updateWindowName.mutate(
          { id: window.id, name: title },
          {
            optimisticResponse: {
              updateWindow: {
                window: {
                  __typename: "Window",
                  id: window.id,
                  name: title,
                },
              },
            },
          }
        );
      },
    };
  },
});
</script>

<style scoped lang="scss">
.window {
  position: absolute;
}

.lined-grid {
  background-size: 40px 40px;
  background-image: radial-gradient(
    1px 1px at center,
    #aaa 1px,
    transparent 2px
  );
  background-attachment: local;
}

.snap {
  position: absolute;
  padding: 0;
  margin: 0;
  opacity: 1;
  z-index: 1000;

  &.snap-horizontal {
    border-top: lightgray dashed 2px;
    width: 100%;
  }

  &.snap-vertical {
    border-left: lightgray dashed 2px;
    height: 100%;
  }
}
</style>
