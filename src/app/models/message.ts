export interface Message {
  messageId: number;
  taskId: number;
  from: string;
  fromUserName: string;
  to: string;
  toUserName: string;
  createdAt: Date;
  messageText: string;
  taskCreator: string;
  reportOwner: string | undefined;
  seen: boolean;
  deleted: boolean;
}
