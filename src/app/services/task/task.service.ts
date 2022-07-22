import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskVO } from 'src/app/models/taskVO';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  // private _url = '../../assets/json/task.json';
  private _url = 'http://localhost:9090/api/tasks/';
  private url = 'http://localhost:9090/api/taskVo/taskId/';
  constructor(private _http: HttpClient) {}

  getTasks = (): Observable<TaskVO[]> => {
    return this._http.get<TaskVO[]>(this._url);
  };
  getTasksForLoggedInUser = (userName: any): Observable<Task[]> => {
    return this._http.get<Task[]>(this._url.concat(userName));
  };

  getTaskById = (taskId: number): Observable<TaskVO> => {
    return this._http.get<TaskVO>(this.url + `${taskId}`);
  };
}
