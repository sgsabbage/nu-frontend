import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export type AreaKeySpecifier = ('id' | 'name' | 'rooms' | AreaKeySpecifier)[];
export type AreaFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	rooms?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ChannelKeySpecifier = ('characters' | 'description' | 'id' | 'messages' | 'name' | ChannelKeySpecifier)[];
export type ChannelFieldPolicy = {
	characters?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	messages?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ChannelMessageKeySpecifier = ('channel' | 'character' | 'id' | 'message' | 'timestamp' | ChannelMessageKeySpecifier)[];
export type ChannelMessageFieldPolicy = {
	channel?: FieldPolicy<any> | FieldReadFunction<any>,
	character?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ChannelMessageConnectionKeySpecifier = ('edges' | 'pageInfo' | ChannelMessageConnectionKeySpecifier)[];
export type ChannelMessageConnectionFieldPolicy = {
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ChannelMessageEdgeKeySpecifier = ('cursor' | 'node' | ChannelMessageEdgeKeySpecifier)[];
export type ChannelMessageEdgeFieldPolicy = {
	cursor?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CharacterKeySpecifier = ('baseColor' | 'currentRoom' | 'id' | 'name' | CharacterKeySpecifier)[];
export type CharacterFieldPolicy = {
	baseColor?: FieldPolicy<any> | FieldReadFunction<any>,
	currentRoom?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CloseWindowResultKeySpecifier = ('ok' | CloseWindowResultKeySpecifier)[];
export type CloseWindowResultFieldPolicy = {
	ok?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ExitKeySpecifier = ('endRoom' | 'id' | 'name' | 'secret' | ExitKeySpecifier)[];
export type ExitFieldPolicy = {
	endRoom?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	secret?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MutationKeySpecifier = ('bringWindowToFront' | 'closeWindow' | 'sendChannelMessage' | 'sendWindowToBack' | 'updateRoom' | 'updateWindow' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
	bringWindowToFront?: FieldPolicy<any> | FieldReadFunction<any>,
	closeWindow?: FieldPolicy<any> | FieldReadFunction<any>,
	sendChannelMessage?: FieldPolicy<any> | FieldReadFunction<any>,
	sendWindowToBack?: FieldPolicy<any> | FieldReadFunction<any>,
	updateRoom?: FieldPolicy<any> | FieldReadFunction<any>,
	updateWindow?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PageInfoKeySpecifier = ('endCursor' | 'hasNextPage' | 'hasPreviousPage' | 'startCursor' | PageInfoKeySpecifier)[];
export type PageInfoFieldPolicy = {
	endCursor?: FieldPolicy<any> | FieldReadFunction<any>,
	hasNextPage?: FieldPolicy<any> | FieldReadFunction<any>,
	hasPreviousPage?: FieldPolicy<any> | FieldReadFunction<any>,
	startCursor?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PlayerKeySpecifier = ('characters' | 'email' | 'id' | 'username' | 'windows' | PlayerKeySpecifier)[];
export type PlayerFieldPolicy = {
	characters?: FieldPolicy<any> | FieldReadFunction<any>,
	email?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	username?: FieldPolicy<any> | FieldReadFunction<any>,
	windows?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('areas' | 'channel' | 'channels' | 'me' | 'rooms' | 'windows' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	areas?: FieldPolicy<any> | FieldReadFunction<any>,
	channel?: FieldPolicy<any> | FieldReadFunction<any>,
	channels?: FieldPolicy<any> | FieldReadFunction<any>,
	me?: FieldPolicy<any> | FieldReadFunction<any>,
	rooms?: FieldPolicy<any> | FieldReadFunction<any>,
	windows?: FieldPolicy<any> | FieldReadFunction<any>
};
export type RoomKeySpecifier = ('area' | 'characters' | 'description' | 'exits' | 'id' | 'name' | 'x' | 'y' | RoomKeySpecifier)[];
export type RoomFieldPolicy = {
	area?: FieldPolicy<any> | FieldReadFunction<any>,
	characters?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	exits?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	x?: FieldPolicy<any> | FieldReadFunction<any>,
	y?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SendChannelMessageResultKeySpecifier = ('message' | SendChannelMessageResultKeySpecifier)[];
export type SendChannelMessageResultFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SubscriptionKeySpecifier = ('channelMessages' | 'roomStatus' | SubscriptionKeySpecifier)[];
export type SubscriptionFieldPolicy = {
	channelMessages?: FieldPolicy<any> | FieldReadFunction<any>,
	roomStatus?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UpdateRoomResultKeySpecifier = ('room' | UpdateRoomResultKeySpecifier)[];
export type UpdateRoomResultFieldPolicy = {
	room?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UpdateWindowResultKeySpecifier = ('window' | UpdateWindowResultKeySpecifier)[];
export type UpdateWindowResultFieldPolicy = {
	window?: FieldPolicy<any> | FieldReadFunction<any>
};
export type WindowKeySpecifier = ('character' | 'component' | 'height' | 'id' | 'left' | 'name' | 'settings' | 'top' | 'width' | WindowKeySpecifier)[];
export type WindowFieldPolicy = {
	character?: FieldPolicy<any> | FieldReadFunction<any>,
	component?: FieldPolicy<any> | FieldReadFunction<any>,
	height?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	left?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	settings?: FieldPolicy<any> | FieldReadFunction<any>,
	top?: FieldPolicy<any> | FieldReadFunction<any>,
	width?: FieldPolicy<any> | FieldReadFunction<any>
};
export type WindowOrderResultKeySpecifier = ('windows' | WindowOrderResultKeySpecifier)[];
export type WindowOrderResultFieldPolicy = {
	windows?: FieldPolicy<any> | FieldReadFunction<any>
};
export type WindowSettingKeySpecifier = ('key' | 'value' | WindowSettingKeySpecifier)[];
export type WindowSettingFieldPolicy = {
	key?: FieldPolicy<any> | FieldReadFunction<any>,
	value?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StrictTypedTypePolicies = {
	Area?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AreaKeySpecifier | (() => undefined | AreaKeySpecifier),
		fields?: AreaFieldPolicy,
	},
	Channel?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ChannelKeySpecifier | (() => undefined | ChannelKeySpecifier),
		fields?: ChannelFieldPolicy,
	},
	ChannelMessage?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ChannelMessageKeySpecifier | (() => undefined | ChannelMessageKeySpecifier),
		fields?: ChannelMessageFieldPolicy,
	},
	ChannelMessageConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ChannelMessageConnectionKeySpecifier | (() => undefined | ChannelMessageConnectionKeySpecifier),
		fields?: ChannelMessageConnectionFieldPolicy,
	},
	ChannelMessageEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ChannelMessageEdgeKeySpecifier | (() => undefined | ChannelMessageEdgeKeySpecifier),
		fields?: ChannelMessageEdgeFieldPolicy,
	},
	Character?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CharacterKeySpecifier | (() => undefined | CharacterKeySpecifier),
		fields?: CharacterFieldPolicy,
	},
	CloseWindowResult?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CloseWindowResultKeySpecifier | (() => undefined | CloseWindowResultKeySpecifier),
		fields?: CloseWindowResultFieldPolicy,
	},
	Exit?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ExitKeySpecifier | (() => undefined | ExitKeySpecifier),
		fields?: ExitFieldPolicy,
	},
	Mutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier),
		fields?: MutationFieldPolicy,
	},
	PageInfo?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PageInfoKeySpecifier | (() => undefined | PageInfoKeySpecifier),
		fields?: PageInfoFieldPolicy,
	},
	Player?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PlayerKeySpecifier | (() => undefined | PlayerKeySpecifier),
		fields?: PlayerFieldPolicy,
	},
	Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier),
		fields?: QueryFieldPolicy,
	},
	Room?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | RoomKeySpecifier | (() => undefined | RoomKeySpecifier),
		fields?: RoomFieldPolicy,
	},
	SendChannelMessageResult?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SendChannelMessageResultKeySpecifier | (() => undefined | SendChannelMessageResultKeySpecifier),
		fields?: SendChannelMessageResultFieldPolicy,
	},
	Subscription?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SubscriptionKeySpecifier | (() => undefined | SubscriptionKeySpecifier),
		fields?: SubscriptionFieldPolicy,
	},
	UpdateRoomResult?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UpdateRoomResultKeySpecifier | (() => undefined | UpdateRoomResultKeySpecifier),
		fields?: UpdateRoomResultFieldPolicy,
	},
	UpdateWindowResult?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UpdateWindowResultKeySpecifier | (() => undefined | UpdateWindowResultKeySpecifier),
		fields?: UpdateWindowResultFieldPolicy,
	},
	Window?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | WindowKeySpecifier | (() => undefined | WindowKeySpecifier),
		fields?: WindowFieldPolicy,
	},
	WindowOrderResult?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | WindowOrderResultKeySpecifier | (() => undefined | WindowOrderResultKeySpecifier),
		fields?: WindowOrderResultFieldPolicy,
	},
	WindowSetting?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | WindowSettingKeySpecifier | (() => undefined | WindowSettingKeySpecifier),
		fields?: WindowSettingFieldPolicy,
	}
};
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies;