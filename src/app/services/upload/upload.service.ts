import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private _baseUrl = '/api';

  constructor(private _httpClient: HttpClient) {}

  uploadFiles = (
    files: FileList | null,
    requestId?: any,
    taskId?: any
  ): Observable<any> => {
    // taskId = 1;
    const formData: FormData = new FormData();
    if (files === null) {
      return of('Failed to Upload files. Please try again');
    }
    for (var i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }
    if (requestId) {
      formData.append('requestId', requestId);
    }
    if (taskId) {
      formData.append('taskId', taskId);
    }
    return this._httpClient.post<string>(`${this._baseUrl}/upload`, formData);
  };

  getAllFiles = (requestId?: any, taskId?: any): Observable<any> => {
    let url = `${this._baseUrl}/listFiles?requestId=${requestId}&taskId=${taskId}`;
    // let params = new HttpParams();
    // params = params.append('requestId', 0);
    // params = params.append('taskId', 1);
    return this._httpClient.get<string>(url);
  };
}
