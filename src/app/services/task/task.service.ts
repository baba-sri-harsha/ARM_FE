import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  // private _url = '../../assets/json/task.json';
  private _url = 'http://localhost:9090/api/tasks/';
  constructor(private _http: HttpClient) {}

  getTasks = (): Observable<Task[]> => {
    return this._http.get<Task[]>(this._url);
  };
  getTasksForLoggedInUser = (userName: any): Observable<Task[]> => {
    return this._http.get<Task[]>(this._url.concat(userName));
  };
}
