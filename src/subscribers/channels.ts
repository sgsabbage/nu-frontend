import { watch } from "vue";
import "simplebar/dist/simplebar.min.css";
import { SubscribeToChannelsDocument } from "@/queries";
import { useApolloClient, useSubscription } from "@vue/apollo-composable";
import gql from "graphql-tag";

export default function setup(): void {
  const { result: sub } = useSubscription(SubscribeToChannelsDocument);
  const { resolveClient } = useApolloClient();
  const client = resolveClient();
  watch(sub, (data) => {
    if (data == null) {
      return;
    }
    const message = data.channelMessages;
    if (!message) {
      return;
    }
    const channelId = message.channel.id;
    const { channel } = client.readQuery({
      query: gql`
        query LatestMessage($id: ID!) {
          channel(id: $id) {
            messages(last: 1) {
              pageInfo {
                endCursor
              }
            }
          }
        }
      `,
      variables: {
        id: channelId,
      },
    });
    const after = channel.messages.pageInfo.endCursor;
    client.writeQuery({
      query: gql`
        query MessageAdd($id: ID!, $after: String) {
          channel(id: $id) {
            id
            messages(after: $after) {
              pageInfo {
                endCursor
              }
              edges {
                cursor
                node {
                  id
                  message
                }
              }
            }
          }
        }
      `,
      variables: {
        id: channelId,
        after: after,
      },
      data: {
        channel: {
          __typename: "Channel",
          id: channelId,
          messages: {
            __typename: "ChannelMessageConnection",
            pageInfo: {
              __typename: "PageInfo",
              endCursor: message.timestamp,
            },
            edges: [
              {
                __typename: "ChannelMessageEdge",
                cursor: message.timestamp,
                node: message,
              },
            ],
          },
        },
      },
    });
  });
}
