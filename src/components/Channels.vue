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
          v-for="channel in characterChannels"
          :key="channel.name"
          class="channel-item-outer"
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
          <Channel v-if="selectedChannel" :channel="selectedChannel" />
        </SimpleBar>

        <div class="channel-input">
          <textarea
            v-model="channelInput"
            :disabled="selectedChannel == null"
            class="form-control"
            :placeholder="
              selectedChannel == null
                ? 'Please select a channel'
                : 'Send text to the channel...'
            "
            rows="2"
            @keydown="onInputKeydown"
          >
          </textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, toRefs } from "vue";
import "simplebar/dist/simplebar.min.css";
import SimpleBar from "@/components/SimpleBar.vue";
import { CurrentCharacter } from "@/types";
import {
  GetChannelsDocument,
  ChannelBaseFragment,
  SendChannelMessageDocument,
} from "@/queries";
import { useMutation, useQuery } from "@vue/apollo-composable";
import Channel from "./Channel.vue";

const props = defineProps({
  character: {
    type: Object as () => CurrentCharacter,
    required: true,
  },
  settings: {
    type: Object,
    required: true,
  },
  active: Boolean,
});

const messagesToLoad = 1;
let channelInput = ref("");
let selectedChannelByCharacter = ref<Record<string, string>>({});
let sendMessage = useMutation(SendChannelMessageDocument);
const { character, settings } = toRefs(props);
const emit = defineEmits(["updatesettings"]);

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

    sendMessage.mutate({
      input: {
        id: selectedChannel.value.id,
        characterId: character.value.id,
        message: channelInput.value,
      },
    });
    channelInput.value = "";
  }
};

const selectChannel = (c: ChannelBaseFragment) => {
  selectedChannelByCharacter.value[character.value.id] = c.id;
  let settings: Record<string, string> = {};
  for (let k of Object.keys(selectedChannelByCharacter.value)) {
    settings[`selectedChannel-${k}`] = selectedChannelByCharacter.value[k];
  }
  emit("updatesettings", settings);
};

const { result: data } = useQuery(GetChannelsDocument, {
  last: messagesToLoad,
});

let channels = computed(() => data.value?.channels ?? []);

const characterChannels = computed(
  () =>
    channels.value.filter(
      (c) =>
        c.characters.find((char) => char.id === character.value.id) != undefined
    ) || []
);

const selectedChannel = computed(() =>
  channels.value.find(
    (c) => c.id === selectedChannelByCharacter.value[character.value.id]
  )
);
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
