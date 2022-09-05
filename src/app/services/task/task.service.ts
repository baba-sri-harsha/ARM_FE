import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskView } from 'src/app/models/task-view';
import { TaskVO } from 'src/app/models/taskVO';
/**
 * @author - Sandeep Pinasimham
 */
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  // private _url = '../../assets/json/task.json';
  private _url = '/api/tasks/';
  private url = '/api/taskVo/taskId/';
  constructor(private _http: HttpClient) {}
  /**
   * to get all the tasks available in a particular request
   * @author - Awadhesh
   * @param reqId 
   * @returns 
   */
  getTasksByReqId(reqId: number): Observable<TaskView[]> {
    // const url = '/assets/json/tasks.json';
    const url = `${this._url}reqId/${reqId}`;
    return this._http.get<TaskView[]>(url);
  }
  /**
   * @author - Sandeep Pinasimham
   * @returns 
   */
  getTasks = (): Observable<TaskVO[]> => {
    return this._http.get<TaskVO[]>(this._url);
  };

  /**
   * to get tasks allotted to a particular report owner
   * @author - Sandeep Pinasimham
   * @param userName 
   * @returns 
   */
  getTasksForLoggedInUser = (userName: any): Observable<TaskVO[]> => {
    return this._http.get<TaskVO[]>(this._url.concat(userName));
  };

  /**
   * to get all the details of a particular task
   * @author - Awadhesh
   * @param taskId 
   * @returns 
   */
  getTaskById = (taskId: number): Observable<TaskVO> => {
    return this._http.get<TaskVO>(this.url + `${taskId}`);
  };
}
