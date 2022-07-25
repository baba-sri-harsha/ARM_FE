import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReqId } from 'src/app/models/req-id';

@Injectable({
  providedIn: 'root'
})
export class ReqIdService {

  constructor(private _httpClient: HttpClient) { }
  getRequestId=():Observable<ReqId>=>{
    const url='http://localhost:9090/api/reqid';
    return this._httpClient.get<ReqId>(url);
  }
}
