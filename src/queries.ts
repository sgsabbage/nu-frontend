import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
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
  /** Date with time (isoformat) */
  DateTime: Date;
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
  character: Character;
  id: Scalars['ID'];
  message: Scalars['String'];
  timestamp: Scalars['DateTime'];
};

export type ChannelMessageConnection = {
  __typename?: 'ChannelMessageConnection';
  edges: Array<ChannelMessageEdge>;
  pageInfo: PageInfo;
};

export type ChannelMessageEdge = {
  __typename?: 'ChannelMessageEdge';
  cursor: Scalars['String'];
  node: ChannelMessage;
};

export type Character = {
  __typename?: 'Character';
  baseColor?: Maybe<Scalars['String']>;
  currentRoom: Room;
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type CloseWindowInput = {
  id: Scalars['UUID'];
};

export type CloseWindowResult = {
  __typename?: 'CloseWindowResult';
  ok: Scalars['Boolean'];
};

export type Exit = {
  __typename?: 'Exit';
  endRoom: Room;
  id: Scalars['UUID'];
  name?: Maybe<Scalars['String']>;
  secret: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  bringWindowToFront: WindowOrderResult;
  closeWindow: CloseWindowResult;
  sendChannelMessage: SendChannelMessageResult;
  sendWindowToBack: WindowOrderResult;
  updateRoom: UpdateRoomResult;
  updateWindow: UpdateWindowResult;
};


export type MutationBringWindowToFrontArgs = {
  id: Scalars['UUID'];
};


export type MutationCloseWindowArgs = {
  input: CloseWindowInput;
};


export type MutationSendChannelMessageArgs = {
  input: SendChannelMessageInput;
};


export type MutationSendWindowToBackArgs = {
  id: Scalars['UUID'];
};


export type MutationUpdateRoomArgs = {
  input: UpdateRoomInput;
};


export type MutationUpdateWindowArgs = {
  input: UpdateWindowInput;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type Player = {
  __typename?: 'Player';
  characters: Array<Character>;
  email: Scalars['String'];
  id: Scalars['ID'];
  username: Scalars['String'];
  windows: Array<Window>;
};

export type Query = {
  __typename?: 'Query';
  areas: Array<Area>;
  channel: Channel;
  channels: Array<Channel>;
  me: Player;
  rooms: Array<Room>;
  windows: Array<Window>;
};


export type QueryChannelArgs = {
  id: Scalars['ID'];
};

export type Room = {
  __typename?: 'Room';
  area: Area;
  characters: Array<Character>;
  description?: Maybe<Scalars['String']>;
  exits: Array<Exit>;
  id: Scalars['ID'];
  name: Scalars['String'];
  x: Scalars['Int'];
  y: Scalars['Int'];
};

export type SendChannelMessageInput = {
  characterId: Scalars['UUID'];
  id: Scalars['UUID'];
  message: Scalars['String'];
};

export type SendChannelMessageResult = {
  __typename?: 'SendChannelMessageResult';
  message: ChannelMessage;
};

export type Subscription = {
  __typename?: 'Subscription';
  channelMessages?: Maybe<ChannelMessage>;
  roomStatus?: Maybe<Room>;
};

export type UpdateRoomInput = {
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateRoomResult = {
  __typename?: 'UpdateRoomResult';
  room: Room;
};

export type UpdateWindowInput = {
  characterId?: InputMaybe<Scalars['UUID']>;
  height?: InputMaybe<Scalars['Int']>;
  id: Scalars['UUID'];
  left?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  settings?: InputMaybe<Array<WindowSettingInput>>;
  top?: InputMaybe<Scalars['Int']>;
  width?: InputMaybe<Scalars['Int']>;
  z?: InputMaybe<Scalars['Int']>;
};

export type UpdateWindowResult = {
  __typename?: 'UpdateWindowResult';
  window: Window;
};

export type Window = {
  __typename?: 'Window';
  character?: Maybe<Character>;
  component?: Maybe<Scalars['String']>;
  height: Scalars['Int'];
  id: Scalars['ID'];
  left: Scalars['Int'];
  name: Scalars['String'];
  settings: Array<WindowSetting>;
  top: Scalars['Int'];
  width: Scalars['Int'];
};

export type WindowOrderResult = {
  __typename?: 'WindowOrderResult';
  windows: Array<Window>;
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

export type ChannelMessageFragment = { __typename?: 'ChannelMessage', id: string, message: string, timestamp: Date, character: { __typename?: 'Character', id: string, name: string } };

export type PlayerCharactersFragment = { __typename?: 'Player', characters: Array<{ __typename?: 'Character', id: string, name: string, baseColor?: string | null }> };

export type ChannelBaseFragment = { __typename?: 'Channel', id: string, name: string, description?: string | null };

export type PageInfoAllFragment = { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null };

export type ChannelMessagesFragment = { __typename?: 'ChannelMessageConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null }, edges: Array<{ __typename?: 'ChannelMessageEdge', cursor: string, node: { __typename?: 'ChannelMessage', id: string, message: string, timestamp: Date, character: { __typename?: 'Character', id: string, name: string } } }> };

export type CurrentCharacterFragment = { __typename?: 'Character', id: string, name: string, baseColor?: string | null, currentRoom: { __typename?: 'Room', id: string, name: string, description?: string | null } };

export type UpdateWindowMutationVariables = Exact<{
  input: UpdateWindowInput;
}>;


export type UpdateWindowMutation = { __typename?: 'Mutation', updateWindow: { __typename?: 'UpdateWindowResult', window: { __typename?: 'Window', id: string, name: string, top: number, left: number, height: number, width: number, character?: { __typename?: 'Character', id: string, name: string, baseColor?: string | null } | null, settings: Array<{ __typename?: 'WindowSetting', key: string, value: string }> } } };

export type UpdateWindowNameMutationVariables = Exact<{
  name: Scalars['String'];
  id: Scalars['UUID'];
}>;


export type UpdateWindowNameMutation = { __typename?: 'Mutation', updateWindow: { __typename?: 'UpdateWindowResult', window: { __typename?: 'Window', id: string, name: string } } };

export type BringWindowToFrontMutationVariables = Exact<{
  id: Scalars['UUID'];
}>;


export type BringWindowToFrontMutation = { __typename?: 'Mutation', bringWindowToFront: { __typename?: 'WindowOrderResult', windows: Array<{ __typename?: 'Window', id: string }> } };

export type SendWindowToBackMutationVariables = Exact<{
  id: Scalars['UUID'];
}>;


export type SendWindowToBackMutation = { __typename?: 'Mutation', sendWindowToBack: { __typename?: 'WindowOrderResult', windows: Array<{ __typename?: 'Window', id: string }> } };

export type UpdateWindowLocationMutationVariables = Exact<{
  input: UpdateWindowInput;
}>;


export type UpdateWindowLocationMutation = { __typename?: 'Mutation', updateWindow: { __typename?: 'UpdateWindowResult', window: { __typename?: 'Window', id: string } } };

export type CloseWindowMutationVariables = Exact<{
  input: CloseWindowInput;
}>;


export type CloseWindowMutation = { __typename?: 'Mutation', closeWindow: { __typename?: 'CloseWindowResult', ok: boolean } };

export type SendChannelMessageMutationVariables = Exact<{
  input: SendChannelMessageInput;
}>;


export type SendChannelMessageMutation = { __typename?: 'Mutation', sendChannelMessage: { __typename?: 'SendChannelMessageResult', message: { __typename?: 'ChannelMessage', id: string, message: string, timestamp: Date, channel: { __typename?: 'Channel', id: string }, character: { __typename?: 'Character', id: string, name: string } } } };

export type GetChannelsQueryVariables = Exact<{
  last: Scalars['Int'];
  before?: InputMaybe<Scalars['String']>;
}>;


export type GetChannelsQuery = { __typename?: 'Query', channels: Array<{ __typename?: 'Channel', id: string, name: string, description?: string | null, messages: { __typename?: 'ChannelMessageConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null }, edges: Array<{ __typename?: 'ChannelMessageEdge', cursor: string, node: { __typename?: 'ChannelMessage', id: string, message: string, timestamp: Date, character: { __typename?: 'Character', id: string, name: string } } }> }, characters: Array<{ __typename?: 'Character', id: string }> }> };

export type GetChannelMessagesQueryVariables = Exact<{
  id: Scalars['ID'];
  before?: InputMaybe<Scalars['String']>;
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
}>;


export type GetChannelMessagesQuery = { __typename?: 'Query', channel: { __typename?: 'Channel', id: string, messages: { __typename?: 'ChannelMessageConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null }, edges: Array<{ __typename?: 'ChannelMessageEdge', cursor: string, node: { __typename?: 'ChannelMessage', id: string, message: string, timestamp: Date, character: { __typename?: 'Character', id: string, name: string } } }> } } };

export type GetAreasQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAreasQuery = { __typename?: 'Query', areas: Array<{ __typename?: 'Area', id: string, name: string, rooms: Array<{ __typename?: 'Room', id: string, name: string, x: number, y: number, characters: Array<{ __typename?: 'Character', id: string, name: string }>, exits: Array<{ __typename?: 'Exit', id: any, name?: string | null, secret: boolean, endRoom: { __typename?: 'Room', id: string, x: number, y: number } }> }> }> };

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'Query', me: { __typename?: 'Player', id: string, characters: Array<{ __typename?: 'Character', id: string, name: string, baseColor?: string | null, currentRoom: { __typename?: 'Room', id: string, name: string, description?: string | null } }> } };

export type GetMyWindowsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyWindowsQuery = { __typename?: 'Query', windows: Array<{ __typename?: 'Window', id: string, name: string, top: number, left: number, width: number, height: number, component?: string | null, character?: { __typename?: 'Character', id: string, name: string, baseColor?: string | null, currentRoom: { __typename?: 'Room', id: string, name: string, description?: string | null } } | null, settings: Array<{ __typename?: 'WindowSetting', key: string, value: string }> }> };

export type SubscribeToChannelsSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type SubscribeToChannelsSubscription = { __typename?: 'Subscription', channelMessages?: { __typename?: 'ChannelMessage', id: string, message: string, timestamp: Date, channel: { __typename?: 'Channel', id: string }, character: { __typename?: 'Character', id: string, name: string } } | null };

export type SubscribeToRoomSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type SubscribeToRoomSubscription = { __typename?: 'Subscription', roomStatus?: { __typename?: 'Room', id: string, name: string, description?: string | null } | null };

export const PlayerCharactersFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlayerCharacters"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Player"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"characters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"baseColor"}}]}}]}}]} as unknown as DocumentNode<PlayerCharactersFragment, unknown>;
export const ChannelBaseFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ChannelBase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Channel"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]} as unknown as DocumentNode<ChannelBaseFragment, unknown>;
export const PageInfoAllFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PageInfoAll"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PageInfo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"startCursor"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}}]} as unknown as DocumentNode<PageInfoAllFragment, unknown>;
export const ChannelMessageFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ChannelMessage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ChannelMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"character"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<ChannelMessageFragment, unknown>;
export const ChannelMessagesFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ChannelMessages"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ChannelMessageConnection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PageInfoAll"}}]}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ChannelMessage"}}]}}]}}]}},...PageInfoAllFragmentDoc.definitions,...ChannelMessageFragmentDoc.definitions]} as unknown as DocumentNode<ChannelMessagesFragment, unknown>;
export const CurrentCharacterFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CurrentCharacter"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Character"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"baseColor"}},{"kind":"Field","name":{"kind":"Name","value":"currentRoom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<CurrentCharacterFragment, unknown>;
export const UpdateWindowDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateWindow"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateWindowInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateWindow"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"window"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"top"}},{"kind":"Field","name":{"kind":"Name","value":"left"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"character"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"baseColor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"settings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UpdateWindowMutation, UpdateWindowMutationVariables>;
export const UpdateWindowNameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateWindowName"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateWindow"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"window"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateWindowNameMutation, UpdateWindowNameMutationVariables>;
export const BringWindowToFrontDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"bringWindowToFront"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bringWindowToFront"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"windows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<BringWindowToFrontMutation, BringWindowToFrontMutationVariables>;
export const SendWindowToBackDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"sendWindowToBack"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendWindowToBack"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"windows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<SendWindowToBackMutation, SendWindowToBackMutationVariables>;
export const UpdateWindowLocationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateWindowLocation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateWindowInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateWindow"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"window"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateWindowLocationMutation, UpdateWindowLocationMutationVariables>;
export const CloseWindowDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"closeWindow"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CloseWindowInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"closeWindow"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}}]}}]}}]} as unknown as DocumentNode<CloseWindowMutation, CloseWindowMutationVariables>;
export const SendChannelMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"sendChannelMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SendChannelMessageInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendChannelMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"channel"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ChannelMessage"}}]}}]}}]}},...ChannelMessageFragmentDoc.definitions]} as unknown as DocumentNode<SendChannelMessageMutation, SendChannelMessageMutationVariables>;
export const GetChannelsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getChannels"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"last"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"before"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"channels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ChannelBase"}},{"kind":"Field","name":{"kind":"Name","value":"messages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"last"},"value":{"kind":"Variable","name":{"kind":"Name","value":"last"}}},{"kind":"Argument","name":{"kind":"Name","value":"before"},"value":{"kind":"Variable","name":{"kind":"Name","value":"before"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ChannelMessages"}}]}},{"kind":"Field","name":{"kind":"Name","value":"characters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}},...ChannelBaseFragmentDoc.definitions,...ChannelMessagesFragmentDoc.definitions]} as unknown as DocumentNode<GetChannelsQuery, GetChannelsQueryVariables>;
export const GetChannelMessagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getChannelMessages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"before"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"last"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"channel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"messages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"before"},"value":{"kind":"Variable","name":{"kind":"Name","value":"before"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"last"},"value":{"kind":"Variable","name":{"kind":"Name","value":"last"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ChannelMessages"}}]}}]}}]}},...ChannelMessagesFragmentDoc.definitions]} as unknown as DocumentNode<GetChannelMessagesQuery, GetChannelMessagesQueryVariables>;
export const GetAreasDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAreas"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"areas"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"rooms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"x"}},{"kind":"Field","name":{"kind":"Name","value":"y"}},{"kind":"Field","name":{"kind":"Name","value":"characters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"exits"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"secret"}},{"kind":"Field","name":{"kind":"Name","value":"endRoom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"x"}},{"kind":"Field","name":{"kind":"Name","value":"y"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetAreasQuery, GetAreasQueryVariables>;
export const GetMeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getMe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"characters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CurrentCharacter"}}]}}]}}]}},...CurrentCharacterFragmentDoc.definitions]} as unknown as DocumentNode<GetMeQuery, GetMeQueryVariables>;
export const GetMyWindowsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getMyWindows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"windows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"top"}},{"kind":"Field","name":{"kind":"Name","value":"left"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"component"}},{"kind":"Field","name":{"kind":"Name","value":"character"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CurrentCharacter"}}]}},{"kind":"Field","name":{"kind":"Name","value":"settings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}},...CurrentCharacterFragmentDoc.definitions]} as unknown as DocumentNode<GetMyWindowsQuery, GetMyWindowsQueryVariables>;
export const SubscribeToChannelsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"subscribeToChannels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"channelMessages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"channel"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"character"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]}}]} as unknown as DocumentNode<SubscribeToChannelsSubscription, SubscribeToChannelsSubscriptionVariables>;
export const SubscribeToRoomDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"subscribeToRoom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roomStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<SubscribeToRoomSubscription, SubscribeToRoomSubscriptionVariables>;