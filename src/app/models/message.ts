export interface Message {
  messageId: number;
  taskId: number;
  from: string;
  fromUserName: string;
  to: string;
  toUserName: string;
  createdAt: Date;
  messageText: string;
  seen: boolean;
  deleted: boolean;
}
