<template>
  <div class="channels d-flex flex-column">
    <div class="channel-title">
      <div class="channel-title-outer mt-3">
        <div class="channel-title-inner">
          {{ selectedChannel?.name }}
        </div>
      </div>
    </div>
    <div class="channel-body d-flex">
      <ul class="channel-list me-3">
        <li
          class="channel-item-outer"
          v-for="channel in characterChannels"
          :key="channel.name"
        >
          <a
            class="channel-item-inner"
            :class="channel.name === selectedChannel?.name ? 'active' : ''"
            @click="selectChannel(channel)"
            >{{ channel.name }}
          </a>
        </li>
      </ul>
      <div class="channel-right d-flex flex-column">
        <SimpleBar class="channel-scroll" data-simplebar-auto-hide="false">
          <button
            v-if="selectedChannel?.messages.pageInfo.hasPreviousPage"
            :disabled="loadingPrevious"
            class="btn btn-secondary btn-sm my-2 me-2"
            @click="loadPreviousMessages(selectedChannel)"
          >
            <span
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
              v-if="loadingPrevious"
            ></span>
            Load previous messages
          </button>

          <p v-for="message in visibleMessages" :key="message.id">
            {{ formatMessage(message) }}
          </p>
        </SimpleBar>

        <div class="channel-input">
          <textarea
            :disabled="selectedChannel == null"
            class="form-control"
            v-model="channelInput"
            @keydown="onInputKeydown"
            :placeholder="
              selectedChannel == null
                ? 'Please select a channel'
                : 'Send text to the channel...'
            "
            rows="2"
          >
          </textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, toRefs } from "vue";
import "simplebar/dist/simplebar.min.css";
import SimpleBar from "@/components/SimpleBar.vue";
import { CurrentCharacter } from "@/types";
import {
  GetChannelsQuery,
  useGetChannelPreviousMessagesQuery,
  useGetChannelsQuery,
  useSendChannelMessageMutation,
  useSubscribeToChannelsSubscription,
} from "@/queries";
import { Channel, ChannelMessage, WindowSetting } from "@/gqltypes";

export default defineComponent({
  name: "Channels",
  components: { SimpleBar },
  props: {
    character: {
      type: Object as () => CurrentCharacter,
      required: true,
    },
    settings: {
      type: Object,
      required: true,
    },
    active: Boolean,
  },
  setup(props, { emit }) {
    const messagesToLoad = 5;
    let channelInput = ref("");
    let selectedChannelByCharacter = ref<Record<string, string>>({});
    const { character, settings } = toRefs(props);

    for (let k of Object.keys(settings.value)) {
      if (k.startsWith("selectedChannel-")) {
        let char = k.replace("selectedChannel-", "");
        selectedChannelByCharacter.value[char] = settings.value[k];
      }
    }

    const onInputKeydown = (e: KeyboardEvent) => {
      if (e.code === "Enter") {
        e.preventDefault();
        if (!selectedChannel.value || channelInput.value === "") {
          return;
        }

        executeMutation({
          input: {
            id: selectedChannel.value.id,
            characterId: character.value.id,
            message: channelInput.value,
          },
        });
        channelInput.value = "";
      }
    };

    const queryId = ref("");
    const before = ref<string | null>("");

    const selectChannel = (c: Channel) => {
      selectedChannelByCharacter.value[character.value.id] = c.id;
      let settings: Record<string, string> = {};
      for (let k of Object.keys(selectedChannelByCharacter.value)) {
        settings[`selectedChannel-${k}`] = selectedChannelByCharacter.value[k];
      }
      emit("updatesettings", settings);
    };

    const formatMessage = (c: ChannelMessage) => {
      let message = "";
      message += `[${new Intl.DateTimeFormat("default", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      }).format(c.timestamp)}] `;
      if (!c.character) {
        return c.message;
      }
      message += c.character.name;
      if (c.message.startsWith(":")) {
        message += ` ${c.message.substr(1)}`;
      } else if (c.message.startsWith(";")) {
        message += `${c.message.substr(1)}`;
      } else {
        message += `: ${c.message}`;
      }
      return message;
    };

    const { data } = useGetChannelsQuery({
      variables: { last: messagesToLoad, before: new Date().toISOString() },
    });
    useSubscribeToChannelsSubscription();
    const { executeMutation } = useSendChannelMessageMutation();
    let channels = computed<GetChannelsQuery["channels"]>(
      () => data.value?.channels || []
    );

    const characterChannels = computed(
      () =>
        channels.value.filter(
          (c) =>
            c.characters.find((char) => char.id === character.value.id) !=
            undefined
        ) || []
    );

    const selectedChannel = computed(() =>
      channels.value.find(
        (c) => c.id === selectedChannelByCharacter.value[character.value.id]
      )
    );

    const visibleMessages = computed(() => {
      if (selectedChannel.value) {
        const nodes = [...selectedChannel.value.messages.nodes];
        return nodes.sort((a, b) => a.timestamp - b.timestamp);
      }
      return [];
    });

    const vars = reactive({
      id: queryId,
      before: before,
      last: messagesToLoad,
    });

    const prevMess = useGetChannelPreviousMessagesQuery({
      variables: vars,
      pause: true,
    });

    const loadPreviousMessages = (c: Channel) => {
      if (c.messages.nodes[0]) {
        before.value = c.messages.nodes[0].timestamp.toISOString();
      } else {
        before.value = null;
      }

      queryId.value = c.id;
      prevMess.resume();
    };

    return {
      loadPreviousMessages,
      loadingPrevious: prevMess.fetching,
      data,
      selectedChannel,
      selectedChannelByCharacter,
      characterChannels,
      channelInput,
      visibleMessages,
      formatMessage,
      selectChannel,
      onInputKeydown,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../scss/variables";

.channels {
  padding: 10px;
  height: 100%;
}

.unread-indicator {
  font-size: 0.8rem;
  background-color: var(--nu-light-1);
  border-radius: 0;
  padding: 4px;
}

.channel-title-outer {
  padding: 1px;
  border-radius: 0;
  background-color: var(--nu-dark-1);
  clip-path: $notch-subtle-path;
}

.channel-title-inner {
  font-family: "Zen Dots", monospace;
  text-align: center;
  line-height: 20px;
  border-radius: 0;
  background-color: var(--nu-dark-2);
  color: white;
  height: 20px;
  clip-path: $notch-subtle-path;
  font-size: 0.8rem;
}

.channel-list {
  font-size: 0.8rem;
  list-style: none;
  padding: 0;
}

.channel-item-outer {
  background-color: var(--nu-dark-1);
  padding: 0 1px 1px 1px;

  &:last-child {
    clip-path: $notch-subtle-bottom-path;
  }
}

.channel-item-inner {
  text-decoration: none;
  line-height: 30px;
  display: block;
  cursor: pointer;
  background-color: var(--nu-dark-3);
  color: white;
  padding: 0 20px;

  &.active {
    background-color: var(--nu-dark-2);
  }

  &:active {
    background-color: var(--nu-light-1);
  }

  &:hover {
    background-color: var(--nu-dark-1);
  }

  li:last-child & {
    clip-path: $notch-subtle-bottom-path;
  }
}

.channel-right {
  flex-grow: 1;
  min-height: 0;
}

.channel-scroll {
  flex-grow: 1;
  min-height: 0;
}

.channel-body {
  flex-grow: 1;
  min-height: 0;

  ::v-deep .simplebar-scrollbar::before {
    background-color: var(--nu-base);
    border-radius: 0;
    margin-top: 2px;
  }

  p {
    margin-bottom: 2px;
    font-size: 0.8rem;
  }
}

.channel-input {
  flex-grow: 0;
  .form-control {
    width: calc(100% - 10px);
    resize: none;
  }
}
</style>
