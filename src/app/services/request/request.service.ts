import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CategoryVO } from 'src/app/models/category-vo';
import { RequestView } from 'src/app/models/requestView';
import { Request } from 'src/app/models/request';
import { CreateRequest } from 'src/app/models/CreateRequest';

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
    // const url = '/assets/json/categories.json';

    return this._httpClient
      .get<CategoryVO[]>(url, { responseType: 'json' })
      .pipe(
        map((categories: CategoryVO[]) =>
          categories.map((category) => ({
            ...category,
            owner: {
              ownerName: category.ownerName
            }
          }))
        )
      );
  };

  getRequestById = (id: number): Observable<RequestView> => {
    return this._httpClient.get<RequestView>(`${this._baseurl}/id/${id}`);
  };

  createRequest = (createRequest: CreateRequest): Observable<string> => {
    const url = `/api/requests`;
    return this._httpClient.post<string>(url, createRequest, {
      responseType: 'text' as 'json'
    });
  };
}
