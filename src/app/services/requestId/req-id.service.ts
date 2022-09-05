import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReqId } from 'src/app/models/req-id';
/**
 * @author - Dibya Prakash Ojha
 */
@Injectable({
  providedIn: 'root'
})
export class ReqIdService {
  constructor(private _httpClient: HttpClient) {}
  /**
   * to get request id for creating a new request
   */
  getRequestId = (): Observable<ReqId> => {
    const url = '/api/reqid';
    return this._httpClient.get<ReqId>(url);
  };
}
