import { Resolver as GraphCacheResolver, UpdateResolver as GraphCacheUpdateResolver, OptimisticMutationResolver as GraphCacheOptimisticMutationResolver, StorageAdapter as GraphCacheStorageAdapter } from '@urql/exchange-graphcache';
import { IntrospectionData } from '@urql/exchange-graphcache/dist/types/ast';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * The `DateTime` scalar type represents a DateTime
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  DateTime: any;
  /**
   * Leverages the internal Python implementation of UUID (uuid.UUID) to provide native UUID objects
   * in fields, resolvers and input.
   */
  UUID: any;
};

export type Area = {
  __typename?: 'Area';
  id: Scalars['ID'];
  name: Scalars['String'];
  rooms: Array<Room>;
};

export type Channel = {
  __typename?: 'Channel';
  characters: Array<Character>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  messages: ChannelMessageConnection;
  name: Scalars['String'];
};


export type ChannelMessagesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type ChannelMessage = {
  __typename?: 'ChannelMessage';
  channel: Channel;
  character?: Maybe<Character>;
  id: Scalars['ID'];
  message: Scalars['String'];
  timestamp: Scalars['DateTime'];
};

export type ChannelMessageConnection = {
  __typename?: 'ChannelMessageConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<ChannelMessageEdge>>;
  nodes: Array<ChannelMessage>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `ChannelMessage` and its cursor. */
export type ChannelMessageEdge = {
  __typename?: 'ChannelMessageEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<ChannelMessage>;
};

export type Character = {
  __typename?: 'Character';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type CloseWindow = {
  __typename?: 'CloseWindow';
  ok: Scalars['Boolean'];
};

export type CloseWindowInput = {
  id: Scalars['UUID'];
};

export type CurrentCharacter = {
  __typename?: 'CurrentCharacter';
  baseColor?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type CurrentPlayer = {
  __typename?: 'CurrentPlayer';
  characters: Array<CurrentCharacter>;
  email: Scalars['String'];
  id: Scalars['ID'];
  username: Scalars['String'];
  windows: Array<Window>;
};

export type Exit = {
  __typename?: 'Exit';
  endRoom: Room;
  id: Scalars['ID'];
  name: Scalars['String'];
  secret: Scalars['Boolean'];
  startRoom: Room;
};

export type Mutation = {
  __typename?: 'Mutation';
  closeWindow?: Maybe<CloseWindow>;
  openWindow: OpenWindow;
  sendChannelMessage?: Maybe<SendChannelMessage>;
  updateWindow?: Maybe<UpdateWindow>;
};


export type MutationCloseWindowArgs = {
  input: CloseWindowInput;
};


export type MutationOpenWindowArgs = {
  input: OpenWindowInput;
};


export type MutationSendChannelMessageArgs = {
  input: SendChannelMessageInput;
};


export type MutationUpdateWindowArgs = {
  input: UpdateWindowInput;
};

export type OpenWindow = {
  __typename?: 'OpenWindow';
  window: Window;
};

export type OpenWindowInput = {
  characterId: Scalars['UUID'];
  component: Scalars['String'];
  height: Scalars['Int'];
  left: Scalars['Int'];
  top: Scalars['Int'];
  width: Scalars['Int'];
  z: Scalars['Int'];
};

/** The Relay compliant `PageInfo` type, containing data necessary to paginate this connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  areas: Array<Area>;
  channel: Channel;
  channels: Array<Channel>;
  me: CurrentPlayer;
};


export type QueryChannelArgs = {
  id: Scalars['ID'];
};

export type Room = {
  __typename?: 'Room';
  area: Area;
  exits: Array<Exit>;
  id: Scalars['ID'];
  name: Scalars['String'];
  x: Scalars['Int'];
  y: Scalars['Int'];
};

export type SendChannelMessage = {
  __typename?: 'SendChannelMessage';
  message: ChannelMessage;
};

export type SendChannelMessageInput = {
  characterId: Scalars['UUID'];
  id: Scalars['UUID'];
  message: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  channelMessages?: Maybe<ChannelMessage>;
};

export type UpdateWindow = {
  __typename?: 'UpdateWindow';
  window?: Maybe<Window>;
};

export type UpdateWindowInput = {
  characterId?: InputMaybe<Scalars['UUID']>;
  height?: InputMaybe<Scalars['Int']>;
  id: Scalars['UUID'];
  left?: InputMaybe<Scalars['Int']>;
  settings?: InputMaybe<Array<InputMaybe<WindowSettingInput>>>;
  top?: InputMaybe<Scalars['Int']>;
  width?: InputMaybe<Scalars['Int']>;
  z?: InputMaybe<Scalars['Int']>;
};

export type Window = {
  __typename?: 'Window';
  character?: Maybe<CurrentCharacter>;
  component?: Maybe<Scalars['String']>;
  height: Scalars['Int'];
  id: Scalars['ID'];
  left: Scalars['Int'];
  name: Scalars['String'];
  settings: Array<WindowSetting>;
  top: Scalars['Int'];
  width: Scalars['Int'];
  z: Scalars['Int'];
};

export type WindowSetting = {
  __typename?: 'WindowSetting';
  key: Scalars['String'];
  value: Scalars['String'];
};

export type WindowSettingInput = {
  key: Scalars['String'];
  value: Scalars['String'];
};

export type WithTypename<T extends { __typename?: any }> = { [K in Exclude<keyof T, '__typename'>]?: T[K] } & { __typename: NonNullable<T['__typename']> };

export type GraphCacheKeysConfig = {
  Area?: (data: WithTypename<Area>) => null | string,
  Channel?: (data: WithTypename<Channel>) => null | string,
  ChannelMessage?: (data: WithTypename<ChannelMessage>) => null | string,
  ChannelMessageConnection?: (data: WithTypename<ChannelMessageConnection>) => null | string,
  ChannelMessageEdge?: (data: WithTypename<ChannelMessageEdge>) => null | string,
  Character?: (data: WithTypename<Character>) => null | string,
  CloseWindow?: (data: WithTypename<CloseWindow>) => null | string,
  CurrentCharacter?: (data: WithTypename<CurrentCharacter>) => null | string,
  CurrentPlayer?: (data: WithTypename<CurrentPlayer>) => null | string,
  Exit?: (data: WithTypename<Exit>) => null | string,
  OpenWindow?: (data: WithTypename<OpenWindow>) => null | string,
  PageInfo?: (data: WithTypename<PageInfo>) => null | string,
  Room?: (data: WithTypename<Room>) => null | string,
  SendChannelMessage?: (data: WithTypename<SendChannelMessage>) => null | string,
  UpdateWindow?: (data: WithTypename<UpdateWindow>) => null | string,
  Window?: (data: WithTypename<Window>) => null | string,
  WindowSetting?: (data: WithTypename<WindowSetting>) => null | string
}

export type GraphCacheResolvers = {
  Query?: {
    me?: GraphCacheResolver<WithTypename<Query>, Record<string, never>, WithTypename<CurrentPlayer> | string>,
    channel?: GraphCacheResolver<WithTypename<Query>, QueryChannelArgs, WithTypename<Channel> | string>,
    channels?: GraphCacheResolver<WithTypename<Query>, Record<string, never>, Array<WithTypename<Channel> | string>>,
    areas?: GraphCacheResolver<WithTypename<Query>, Record<string, never>, Array<WithTypename<Area> | string>>
  },
  Area?: {
    id?: GraphCacheResolver<WithTypename<Area>, Record<string, never>, Scalars['ID'] | string>,
    name?: GraphCacheResolver<WithTypename<Area>, Record<string, never>, Scalars['String'] | string>,
    rooms?: GraphCacheResolver<WithTypename<Area>, Record<string, never>, Array<WithTypename<Room> | string>>
  },
  Channel?: {
    id?: GraphCacheResolver<WithTypename<Channel>, Record<string, never>, Scalars['ID'] | string>,
    name?: GraphCacheResolver<WithTypename<Channel>, Record<string, never>, Scalars['String'] | string>,
    description?: GraphCacheResolver<WithTypename<Channel>, Record<string, never>, Scalars['String'] | string>,
    messages?: GraphCacheResolver<WithTypename<Channel>, ChannelMessagesArgs, WithTypename<ChannelMessageConnection> | string>,
    characters?: GraphCacheResolver<WithTypename<Channel>, Record<string, never>, Array<WithTypename<Character> | string>>
  },
  ChannelMessage?: {
    id?: GraphCacheResolver<WithTypename<ChannelMessage>, Record<string, never>, Scalars['ID'] | string>,
    timestamp?: GraphCacheResolver<WithTypename<ChannelMessage>, Record<string, never>, Scalars['DateTime'] | string>,
    message?: GraphCacheResolver<WithTypename<ChannelMessage>, Record<string, never>, Scalars['String'] | string>,
    character?: GraphCacheResolver<WithTypename<ChannelMessage>, Record<string, never>, WithTypename<Character> | string>,
    channel?: GraphCacheResolver<WithTypename<ChannelMessage>, Record<string, never>, WithTypename<Channel> | string>
  },
  ChannelMessageConnection?: {
    pageInfo?: GraphCacheResolver<WithTypename<ChannelMessageConnection>, Record<string, never>, WithTypename<PageInfo> | string>,
    edges?: GraphCacheResolver<WithTypename<ChannelMessageConnection>, Record<string, never>, Array<WithTypename<ChannelMessageEdge> | string>>,
    nodes?: GraphCacheResolver<WithTypename<ChannelMessageConnection>, Record<string, never>, Array<WithTypename<ChannelMessage> | string>>
  },
  ChannelMessageEdge?: {
    node?: GraphCacheResolver<WithTypename<ChannelMessageEdge>, Record<string, never>, WithTypename<ChannelMessage> | string>,
    cursor?: GraphCacheResolver<WithTypename<ChannelMessageEdge>, Record<string, never>, Scalars['String'] | string>
  },
  Character?: {
    id?: GraphCacheResolver<WithTypename<Character>, Record<string, never>, Scalars['ID'] | string>,
    name?: GraphCacheResolver<WithTypename<Character>, Record<string, never>, Scalars['String'] | string>
  },
  CloseWindow?: {
    ok?: GraphCacheResolver<WithTypename<CloseWindow>, Record<string, never>, Scalars['Boolean'] | string>
  },
  CurrentCharacter?: {
    id?: GraphCacheResolver<WithTypename<CurrentCharacter>, Record<string, never>, Scalars['ID'] | string>,
    name?: GraphCacheResolver<WithTypename<CurrentCharacter>, Record<string, never>, Scalars['String'] | string>,
    baseColor?: GraphCacheResolver<WithTypename<CurrentCharacter>, Record<string, never>, Scalars['String'] | string>
  },
  CurrentPlayer?: {
    id?: GraphCacheResolver<WithTypename<CurrentPlayer>, Record<string, never>, Scalars['ID'] | string>,
    username?: GraphCacheResolver<WithTypename<CurrentPlayer>, Record<string, never>, Scalars['String'] | string>,
    email?: GraphCacheResolver<WithTypename<CurrentPlayer>, Record<string, never>, Scalars['String'] | string>,
    characters?: GraphCacheResolver<WithTypename<CurrentPlayer>, Record<string, never>, Array<WithTypename<CurrentCharacter> | string>>,
    windows?: GraphCacheResolver<WithTypename<CurrentPlayer>, Record<string, never>, Array<WithTypename<Window> | string>>
  },
  Exit?: {
    id?: GraphCacheResolver<WithTypename<Exit>, Record<string, never>, Scalars['ID'] | string>,
    name?: GraphCacheResolver<WithTypename<Exit>, Record<string, never>, Scalars['String'] | string>,
    startRoom?: GraphCacheResolver<WithTypename<Exit>, Record<string, never>, WithTypename<Room> | string>,
    endRoom?: GraphCacheResolver<WithTypename<Exit>, Record<string, never>, WithTypename<Room> | string>,
    secret?: GraphCacheResolver<WithTypename<Exit>, Record<string, never>, Scalars['Boolean'] | string>
  },
  OpenWindow?: {
    window?: GraphCacheResolver<WithTypename<OpenWindow>, Record<string, never>, WithTypename<Window> | string>
  },
  PageInfo?: {
    hasNextPage?: GraphCacheResolver<WithTypename<PageInfo>, Record<string, never>, Scalars['Boolean'] | string>,
    hasPreviousPage?: GraphCacheResolver<WithTypename<PageInfo>, Record<string, never>, Scalars['Boolean'] | string>,
    startCursor?: GraphCacheResolver<WithTypename<PageInfo>, Record<string, never>, Scalars['String'] | string>,
    endCursor?: GraphCacheResolver<WithTypename<PageInfo>, Record<string, never>, Scalars['String'] | string>
  },
  Room?: {
    id?: GraphCacheResolver<WithTypename<Room>, Record<string, never>, Scalars['ID'] | string>,
    name?: GraphCacheResolver<WithTypename<Room>, Record<string, never>, Scalars['String'] | string>,
    area?: GraphCacheResolver<WithTypename<Room>, Record<string, never>, WithTypename<Area> | string>,
    x?: GraphCacheResolver<WithTypename<Room>, Record<string, never>, Scalars['Int'] | string>,
    y?: GraphCacheResolver<WithTypename<Room>, Record<string, never>, Scalars['Int'] | string>,
    exits?: GraphCacheResolver<WithTypename<Room>, Record<string, never>, Array<WithTypename<Exit> | string>>
  },
  SendChannelMessage?: {
    message?: GraphCacheResolver<WithTypename<SendChannelMessage>, Record<string, never>, WithTypename<ChannelMessage> | string>
  },
  UpdateWindow?: {
    window?: GraphCacheResolver<WithTypename<UpdateWindow>, Record<string, never>, WithTypename<Window> | string>
  },
  Window?: {
    id?: GraphCacheResolver<WithTypename<Window>, Record<string, never>, Scalars['ID'] | string>,
    name?: GraphCacheResolver<WithTypename<Window>, Record<string, never>, Scalars['String'] | string>,
    component?: GraphCacheResolver<WithTypename<Window>, Record<string, never>, Scalars['String'] | string>,
    character?: GraphCacheResolver<WithTypename<Window>, Record<string, never>, WithTypename<CurrentCharacter> | string>,
    width?: GraphCacheResolver<WithTypename<Window>, Record<string, never>, Scalars['Int'] | string>,
    height?: GraphCacheResolver<WithTypename<Window>, Record<string, never>, Scalars['Int'] | string>,
    top?: GraphCacheResolver<WithTypename<Window>, Record<string, never>, Scalars['Int'] | string>,
    left?: GraphCacheResolver<WithTypename<Window>, Record<string, never>, Scalars['Int'] | string>,
    z?: GraphCacheResolver<WithTypename<Window>, Record<string, never>, Scalars['Int'] | string>,
    settings?: GraphCacheResolver<WithTypename<Window>, Record<string, never>, Array<WithTypename<WindowSetting> | string>>
  },
  WindowSetting?: {
    key?: GraphCacheResolver<WithTypename<WindowSetting>, Record<string, never>, Scalars['String'] | string>,
    value?: GraphCacheResolver<WithTypename<WindowSetting>, Record<string, never>, Scalars['String'] | string>
  }
};

export type GraphCacheOptimisticUpdaters = {
  closeWindow?: GraphCacheOptimisticMutationResolver<MutationCloseWindowArgs, Maybe<WithTypename<CloseWindow>>>,
  openWindow?: GraphCacheOptimisticMutationResolver<MutationOpenWindowArgs, WithTypename<OpenWindow>>,
  updateWindow?: GraphCacheOptimisticMutationResolver<MutationUpdateWindowArgs, Maybe<WithTypename<UpdateWindow>>>,
  sendChannelMessage?: GraphCacheOptimisticMutationResolver<MutationSendChannelMessageArgs, Maybe<WithTypename<SendChannelMessage>>>
};

export type GraphCacheUpdaters = {
  Mutation?: {
    closeWindow?: GraphCacheUpdateResolver<{ closeWindow: Maybe<WithTypename<CloseWindow>> }, MutationCloseWindowArgs>,
    openWindow?: GraphCacheUpdateResolver<{ openWindow: WithTypename<OpenWindow> }, MutationOpenWindowArgs>,
    updateWindow?: GraphCacheUpdateResolver<{ updateWindow: Maybe<WithTypename<UpdateWindow>> }, MutationUpdateWindowArgs>,
    sendChannelMessage?: GraphCacheUpdateResolver<{ sendChannelMessage: Maybe<WithTypename<SendChannelMessage>> }, MutationSendChannelMessageArgs>
  },
  Subscription?: {
    channelMessages?: GraphCacheUpdateResolver<{ channelMessages: Maybe<WithTypename<ChannelMessage>> }, Record<string, never>>
  },
};

export type GraphCacheConfig = {
  schema?: IntrospectionData,
  updates?: GraphCacheUpdaters,
  keys?: GraphCacheKeysConfig,
  optimistic?: GraphCacheOptimisticUpdaters,
  resolvers?: GraphCacheResolvers,
  storage?: GraphCacheStorageAdapter
};