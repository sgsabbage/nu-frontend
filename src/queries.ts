import * as Types from '@/gqltypes';

import gql from 'graphql-tag';
import * as Urql from '@urql/vue';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type UpdateWindowMutationVariables = Types.Exact<{
  input: Types.UpdateWindowInput;
}>;


export type UpdateWindowMutation = { __typename?: 'Mutation', updateWindow?: { __typename?: 'UpdateWindow', window?: { __typename?: 'Window', id: string, top: number, left: number, height: number, width: number, z: number, character?: { __typename?: 'CurrentCharacter', id: string, name: string, baseColor?: string | null } | null, settings: Array<{ __typename?: 'WindowSetting', key: string, value: string }> } | null } | null };

export type CloseWindowMutationVariables = Types.Exact<{
  input: Types.CloseWindowInput;
}>;


export type CloseWindowMutation = { __typename?: 'Mutation', closeWindow?: { __typename?: 'CloseWindow', ok: boolean } | null };

export type SendChannelMessageMutationVariables = Types.Exact<{
  input: Types.SendChannelMessageInput;
}>;


export type SendChannelMessageMutation = { __typename?: 'Mutation', sendChannelMessage?: { __typename?: 'SendChannelMessage', message: { __typename?: 'ChannelMessage', id: string, message: string, timestamp: any, character?: { __typename?: 'Character', id: string, name: string } | null } } | null };

export type OpenWindowMutationVariables = Types.Exact<{
  input: Types.OpenWindowInput;
}>;


export type OpenWindowMutation = { __typename?: 'Mutation', openWindow: { __typename?: 'OpenWindow', window: { __typename?: 'Window', id: string, name: string, component?: string | null, width: number, height: number, top: number, left: number, character?: { __typename?: 'CurrentCharacter', id: string } | null, settings: Array<{ __typename?: 'WindowSetting', key: string, value: string }> } } };

export type GetChannelsQueryVariables = Types.Exact<{
  last: Types.Scalars['Int'];
  before?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type GetChannelsQuery = { __typename?: 'Query', channels: Array<{ __typename?: 'Channel', id: string, name: string, description?: string | null, messages: { __typename?: 'ChannelMessageConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean }, nodes: Array<{ __typename?: 'ChannelMessage', id: string, message: string, timestamp: any, character?: { __typename?: 'Character', id: string, name: string } | null }> }, characters: Array<{ __typename?: 'Character', id: string }> }> };

export type GetChannelPreviousMessagesQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
  before?: Types.InputMaybe<Types.Scalars['String']>;
  last: Types.Scalars['Int'];
}>;


export type GetChannelPreviousMessagesQuery = { __typename?: 'Query', channel: { __typename?: 'Channel', id: string, messages: { __typename?: 'ChannelMessageConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean }, nodes: Array<{ __typename?: 'ChannelMessage', id: string, message: string, timestamp: any, character?: { __typename?: 'Character', id: string, name: string } | null }> } } };

export type GetAreasQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetAreasQuery = { __typename?: 'Query', areas: Array<{ __typename?: 'Area', id: string, name: string, rooms: Array<{ __typename?: 'Room', id: string, name: string, x: number, y: number, exits: Array<{ __typename?: 'Exit', id: string, secret: boolean, endRoom: { __typename?: 'Room', id: string, x: number, y: number } }> }> }> };

export type GetMeQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'Query', me: { __typename?: 'CurrentPlayer', id: string, characters: Array<{ __typename?: 'CurrentCharacter', id: string, name: string, baseColor?: string | null }>, windows: Array<{ __typename?: 'Window', id: string, name: string, z: number, top: number, left: number, width: number, height: number, component?: string | null, character?: { __typename?: 'CurrentCharacter', id: string, name: string, baseColor?: string | null } | null, settings: Array<{ __typename?: 'WindowSetting', key: string, value: string }> }> } };

export type SubscribeToChannelsSubscriptionVariables = Types.Exact<{ [key: string]: never; }>;


export type SubscribeToChannelsSubscription = { __typename?: 'Subscription', channelMessages?: { __typename?: 'ChannelMessage', id: string, message: string, timestamp: any, channel: { __typename?: 'Channel', id: string }, character?: { __typename?: 'Character', id: string, name: string } | null } | null };


export const UpdateWindowDocument = gql`
    mutation updateWindow($input: UpdateWindowInput!) {
  updateWindow(input: $input) {
    window {
      id
      top
      left
      height
      width
      z
      character {
        id
        name
        baseColor
      }
      settings {
        key
        value
      }
    }
  }
}
    `;

export function useUpdateWindowMutation() {
  return Urql.useMutation<UpdateWindowMutation, UpdateWindowMutationVariables>(UpdateWindowDocument);
};
export const CloseWindowDocument = gql`
    mutation closeWindow($input: CloseWindowInput!) {
  closeWindow(input: $input) {
    ok
  }
}
    `;

export function useCloseWindowMutation() {
  return Urql.useMutation<CloseWindowMutation, CloseWindowMutationVariables>(CloseWindowDocument);
};
export const SendChannelMessageDocument = gql`
    mutation sendChannelMessage($input: SendChannelMessageInput!) {
  sendChannelMessage(input: $input) {
    message {
      id
      message
      timestamp
      character {
        id
        name
      }
    }
  }
}
    `;

export function useSendChannelMessageMutation() {
  return Urql.useMutation<SendChannelMessageMutation, SendChannelMessageMutationVariables>(SendChannelMessageDocument);
};
export const OpenWindowDocument = gql`
    mutation openWindow($input: OpenWindowInput!) {
  openWindow(input: $input) {
    window {
      id
      name
      character {
        id
      }
      component
      width
      height
      top
      left
      settings {
        key
        value
      }
    }
  }
}
    `;

export function useOpenWindowMutation() {
  return Urql.useMutation<OpenWindowMutation, OpenWindowMutationVariables>(OpenWindowDocument);
};
export const GetChannelsDocument = gql`
    query getChannels($last: Int!, $before: String) {
  channels {
    id
    name
    description
    messages(last: $last, before: $before) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      nodes {
        id
        message
        timestamp
        character {
          id
          name
        }
      }
    }
    characters {
      id
    }
  }
}
    `;

export function useGetChannelsQuery(options: Omit<Urql.UseQueryArgs<never, GetChannelsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetChannelsQuery>({ query: GetChannelsDocument, ...options });
};
export const GetChannelPreviousMessagesDocument = gql`
    query getChannelPreviousMessages($id: ID!, $before: String, $last: Int!) {
  channel(id: $id) {
    id
    messages(before: $before, last: $last) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      nodes {
        id
        message
        timestamp
        character {
          id
          name
        }
      }
    }
  }
}
    `;

export function useGetChannelPreviousMessagesQuery(options: Omit<Urql.UseQueryArgs<never, GetChannelPreviousMessagesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetChannelPreviousMessagesQuery>({ query: GetChannelPreviousMessagesDocument, ...options });
};
export const GetAreasDocument = gql`
    query getAreas {
  areas {
    id
    name
    rooms {
      id
      name
      x
      y
      exits {
        id
        secret
        endRoom {
          id
          x
          y
        }
      }
    }
  }
}
    `;

export function useGetAreasQuery(options: Omit<Urql.UseQueryArgs<never, GetAreasQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetAreasQuery>({ query: GetAreasDocument, ...options });
};
export const GetMeDocument = gql`
    query getMe {
  me {
    id
    characters {
      id
      name
      baseColor
    }
    windows {
      id
      name
      z
      top
      left
      width
      height
      component
      character {
        id
        name
        baseColor
      }
      settings {
        key
        value
      }
    }
  }
}
    `;

export function useGetMeQuery(options: Omit<Urql.UseQueryArgs<never, GetMeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetMeQuery>({ query: GetMeDocument, ...options });
};
export const SubscribeToChannelsDocument = gql`
    subscription subscribeToChannels {
  channelMessages {
    id
    channel {
      id
    }
    character {
      id
      name
    }
    message
    timestamp
  }
}
    `;

export function useSubscribeToChannelsSubscription<R = SubscribeToChannelsSubscription>(options: Omit<Urql.UseSubscriptionArgs<never, SubscribeToChannelsSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandlerArg<SubscribeToChannelsSubscription, R>) {
  return Urql.useSubscription<SubscribeToChannelsSubscription, R, SubscribeToChannelsSubscriptionVariables>({ query: SubscribeToChannelsDocument, ...options }, handler);
};