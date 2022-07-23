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

  private _baseUrl = 'http://localhost:9090/messages/';

  getMessageByTaskId = (taskId: number): Observable<Message[]> => {
    return this._httpClient.get<Message[]>(this._baseUrl + `${taskId}`);
  };

  private _createURl = 'http://localhost:9090/messages/create';

  createMessage = (message: MessageVo): void => {
    console.log(message);
    this._httpClient.post<void>(this._createURl, message);
  };
}
