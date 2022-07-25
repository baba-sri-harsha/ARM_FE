import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryVO } from 'src/app/models/category-vo';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private _baseurl = '/api/request';
  constructor(private _httpClient: HttpClient) {}

  getAllRequests = (username: string | undefined): Observable<Request[]> => {
    return this._httpClient.get<Request[]>(`${this._baseurl}/${username}`);
  };

  getAllCategories = (): Observable<CategoryVO[]> => {
    const url = '/api/categories_vo';

    return this._httpClient.get<CategoryVO[]>(url, { responseType: 'json' });
  };
}
