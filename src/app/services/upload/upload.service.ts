import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Assets } from 'src/app/models/assets';
/**
 * @author - Dibya Prakash Ojha
 */
@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private _baseUrl = '/api';

  constructor(private _httpClient: HttpClient) {}

  /**
   * to upload a new file
   * @param files 
   * @param requestId 
   * @param taskId 
   * @returns 
   */
  uploadFiles = (files: FileList | null, requestId?: any, taskId?: any) => {
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
    return this._httpClient.post(`${this._baseUrl}/upload`, formData, {
      responseType: 'text'
    });
  };

  /**
   * to get all the available files
   * @param requestId 
   * @param taskId 
   * @returns 
   */
  getAllFiles = (requestId?: any, taskId?: any): Observable<Assets[]> => {
    const paramsObj = {
      ...(requestId && {
        request_id: requestId
      }),
      ...(taskId && {
        task_id: taskId
      })
    };
    const searchParams = new URLSearchParams(paramsObj);

    const url = `${this._baseUrl}/listFiles?${searchParams.toString()}`;
    return this._httpClient.get<Assets[]>(url);
  };

  /**
   * to preview a available file
   * @param fileName 
   * @returns 
   */
  previewFile(fileName: string): Observable<Blob> {
    const url = `${this._baseUrl}/download/${fileName}`;
    const options = { responseType: 'blob' as 'json' };
    return this._httpClient
      .get<Blob>(url, options)
      .pipe(map((res) => new Blob([res], { type: 'application/pdf' })));
  }

  /**
   * to delete an existing file
   * @param fileId 
   * @returns 
   */
  deleteFile(fileId: number): any {
    const url = `${this._baseUrl}/delete/${fileId}`;
    return this._httpClient.get<string>(url, {
      responseType: 'text' as 'json'
    });
  }

  /**
   * to download a file to local storage
   * @param fileName 
   * @returns 
   */
  downloadFile(fileName: string): Observable<Blob> {
    const url = `${this._baseUrl}/download/${fileName}`;
    return this._httpClient.get<Blob>(url);
  }
}
