import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap";
import { SubscriptionClient } from "subscriptions-transport-ws";

import urql, {
  dedupExchange,
  fetchExchange,
  subscriptionExchange,
  gql,
} from "@urql/vue";
import { cacheExchange, Entity, NullArray } from "@urql/exchange-graphcache";
import { GraphCacheConfig } from "@/gqltypes";
import { relayPagination } from "@urql/exchange-graphcache/extras";
import { ChannelMessage } from "@/gqltypes";

const subscriptionClient = new SubscriptionClient("wss://nu.localhost/api", {
  reconnect: true,
});

function isObject(thing: unknown): thing is Record<string, unknown> {
  return typeof thing === "object";
}
createApp(App)
  .use(urql, {
    url: "https://nu.localhost/api",
    exchanges: [
      dedupExchange,
      cacheExchange<GraphCacheConfig>({
        keys: {
          WindowSetting: () => null,
        },
        resolvers: {
          ChannelMessage: {
            timestamp: (parent) => new Date(parent.timestamp),
          },
          Channel: {
            messages: relayPagination(),
          },
          Query: {
            channel: (_, args, cache) => ({
              __typename: "Channel",
              id: args.id,
            }),
          },
        },
        updates: {
          Mutation: {
            closeWindow: (parent, args, cache, info) => {
              if (!parent.closeWindow?.ok) {
                return;
              }
              cache.invalidate({
                __typename: "Window",
                id: args.input.id,
              });
            },
            openWindow: (parent, args, cache, info) => {
              const WindowList = gql`
                {
                  me {
                    id
                    windows {
                      id
                    }
                  }
                }
              `;
              cache.updateQuery({ query: WindowList }, (data) => {
                if (!parent.openWindow?.window) {
                  return;
                }
                data.me.windows.push(parent.openWindow.window);
                return data;
              });
            },
          },
          Subscription: {
            channelMessages({ channelMessages }, args, cache, _info) {
              if (!channelMessages?.channel) {
                return;
              }

              const pages = cache
                .inspectFields({
                  __typename: "Channel",
                  id: channelMessages.channel.id,
                })
                .filter((field) => field.fieldName == "messages");

              if (pages.length > 0) {
                const firstField = pages[0];
                if (!firstField.arguments) {
                  return;
                }

                const k = cache.resolve(
                  {
                    __typename: "Channel",
                    id: channelMessages.channel.id,
                  },
                  "messages",
                  firstField.arguments
                );
                const links = cache.resolve(k as Entity, "nodes");
                if (!Array.isArray(links)) {
                  return;
                }
                links.push(channelMessages);
                cache.link(k as Entity, "nodes", links as NullArray<string>);
              }
            },
          },
        },
      }),
      fetchExchange,
      subscriptionExchange({
        forwardSubscription: (operation) =>
          subscriptionClient.request(operation),
      }),
    ],
  })
  .use(router)
  .mount("#app");
