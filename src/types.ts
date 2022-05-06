export type CurrentPlayer = {
  id: string;
  username: string;
  email: string;
  characters: CurrentCharacter[];
  windows: Window[];
};

export type CurrentCharacter = {
  id: string;
  name: string;
  base_color: string;
};

export type Window = {
  id: string;
  name: string;
  width: number;
  height: number;
  top: number;
  left: number;
  cursor: string;
  character_id?: string;
  component?: string;
  z: number;
  settings: Record<string, string>[];
};

export type Channel = {
  id: string;
  name: string;
  description: string;
  character_ids: string[];
  messages: ChannelMessage[];
};

export type ChannelMessage = {
  id: string;
  timestamp: string;
  character_id: string;
  message: string;
};

export const enum Direction {
  NONE = 0,
  NORTH = 1,
  EAST = 2,
  SOUTH = 4,
  WEST = 8,
}

export type WindowPayload = {
  height?: number;
  width?: number;
  top?: number;
  left?: number;
  z?: number;
};
