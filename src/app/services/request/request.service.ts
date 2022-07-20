import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private _baseurl = 'http://localhost:9090/api/request';
  constructor(private _httpClient: HttpClient) {}

  getAllRequests = (username: string|undefined): Observable<Request[]> => {
    return this._httpClient.get<Request[]>(`${this._baseurl}/${username}`);
  };
}
