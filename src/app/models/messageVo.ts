export interface MessageVo {
  taskId: number;
  fromUserName: string | undefined;
  toUserName: string;
  messageText: string;
}
