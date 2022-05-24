<template>
  <button
    v-if="pageInfo?.hasPreviousPage"
    class="btn btn-secondary btn-sm my-2 me-2"
    @click="fetchPrevious()"
  >
    <span
      v-if="loading"
      class="spinner-border spinner-border-sm"
      role="status"
      aria-hidden="true"
    ></span>
    Load previous messages
  </button>
  <p
    v-for="message in messages?.edges"
    :key="message.node.id"
    class="channel-message"
  >
    {{ formatMessage(message.node) }}
  </p>
</template>

<script lang="ts" setup>
import {
  ChannelBaseFragment,
  ChannelMessageFragment,
  GetChannelMessagesDocument,
} from "@/queries";
import { useQuery } from "@vue/apollo-composable";
import { computed } from "vue";

const props = defineProps({
  channel: {
    type: Object as () => ChannelBaseFragment,
    required: true,
  },
});

const { loading, result, fetchMore } = useQuery(
  GetChannelMessagesDocument,
  () => ({
    id: props.channel?.id,
    last: 1,
  }),
  { notifyOnNetworkStatusChange: true }
);
const messages = computed(() => result.value?.channel.messages);
const pageInfo = computed(() => messages.value?.pageInfo);

const fetchPrevious = () => {
  const before = pageInfo.value?.startCursor;
  fetchMore({ variables: { before, last: 1 } });
};

const formatMessage = (c: ChannelMessageFragment) => {
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
    message += ` ${c.message.substring(1)}`;
  } else if (c.message.startsWith(";")) {
    message += `${c.message.substring(1)}`;
  } else {
    message += `: ${c.message}`;
  }
  return message;
};
</script>

<style scoped>
.channel-message {
  margin-bottom: 2px;
  font-size: 0.8rem;
}
</style>
