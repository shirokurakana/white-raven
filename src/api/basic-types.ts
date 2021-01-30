export type IdType = string;

// ***************************************************
// Message
// ***************************************************

export type TextMessageSegment = {
  type: 'text';
  text: string;
};

export type ImageMessageSegment = {
  type: 'image';
  url: string;
};

export type FaceMessageSegment = {
  type: 'face';
  faceId: string;
};

export type AtMessageSegment = {
  type: 'at';
  targetId: IdType;
};

export type MessageSegment =
  | TextMessageSegment
  | ImageMessageSegment
  | FaceMessageSegment
  | AtMessageSegment;

export type MessageContent = ReadonlyArray<MessageSegment>;

export type Message = {
  id: IdType;
  senderId: IdType;
  timestamp: number;
  content: MessageContent;
};

// ***************************************************
// Contact Info
// ***************************************************

export type GroupRole = 'owner' | 'admin' | 'member';

export type PersonInfo = {
  id: IdType;
  name: string;
  avatar: string;
};

export type FriendInfo = PersonInfo & {
  remark?: string;
  category?: string;
};

export type StrangerInfo = PersonInfo & {
  fromGroupId: IdType;
};

export type GroupInfo = PersonInfo & {
  ownerId: IdType;
  memberCount: number;
  memberCapacity: number;
  selfMuteExpire?: number;
  allMuteExpire?: number;
  description?: string;
};

export type GroupMemberInfo = PersonInfo & {
  groupId: IdType;
  joinTime: number;
  role: GroupRole;
  remark?: string;
};

// ***************************************************
// Session
// ***************************************************

type SessionBase = {
  unreadCount: number;
  lastMessages: ReadonlyArray<Message>;
};

export type FriendSession = SessionBase & {
  type: 'friend';
  contact: FriendInfo;
};

export type StrangerSession = SessionBase & {
  type: 'stranger';
  contact: StrangerInfo;
};

export type GroupSession = SessionBase & {
  type: 'group';
  contact: GroupInfo;
};

export type SessionInfo = FriendSession | StrangerSession | GroupSession;

// ***************************************************
// Request
// ***************************************************

export type MessageBody = {
  content: MessageContent;
};

// ***************************************************
// Response
// ***************************************************

export type Ok<T> = {
  code: 200;
  content: T;
};

export type Err<T> = {
  code: 500;
  reason: T;
};

export type MessageResponse = {
  id: IdType;
  timestamp: number;
};
