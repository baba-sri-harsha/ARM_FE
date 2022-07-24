import { MessageVo } from './../../models/messageVo';
import { Message } from './../../models/message';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(private _httpClient: HttpClient) {}

  private _baseUrl = '/api/messages/';

  getMessageByTaskId = (taskId: number): Observable<Message[]> => {
    return this._httpClient.get<Message[]>(this._baseUrl + `${taskId}`);
  };

  private _createURl = '/api/create/message';

  createMessage = (message: MessageVo): Observable<void> => {
    console.log(message);
    console.log('message');
    return this._httpClient.post<void>(this._createURl, message);
  };

  // private _getReportOwnerUserIdUrl = 'http://localhost:9090/messages/';
}
