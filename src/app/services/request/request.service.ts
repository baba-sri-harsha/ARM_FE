import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CategoryVO } from 'src/app/models/category-vo';
import { RequestView } from 'src/app/models/requestView';
import { Request } from 'src/app/models/request';
import { CreateRequest } from 'src/app/models/createRequest';
/**
 * @author - Baba Sri Harsha
 */
@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private _baseurl = '/api/request';
  constructor(private _httpClient: HttpClient) {}

  /**
   * to get all the requests from backend
   * @author - Baba Sri Harsha
   * @param username 
   * @returns 
   */
  getAllRequests = (username: string | undefined): Observable<Request[]> => {
    return this._httpClient.get<Request[]>(`${this._baseurl}/${username}`);
  };

  /**
   * to get all the categories available from backend
   * @author - Akash Kanaparthi
   * @returns 
   */
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

  /**
   * to get a particular request details from backend 
   * @author - Madhu Shree
   * @param id 
   * @returns 
   */
  getRequestById = (id: number): Observable<RequestView> => {
    return this._httpClient.get<RequestView>(`${this._baseurl}/id/${id}`);
  };

  /**
   * to submit a new request created
   * @author - Baba Sri Harsha
   * @param createRequest 
   * @returns 
   */
  createRequest = (createRequest: CreateRequest): Observable<string> => {
    const url = `/api/requests`;
    return this._httpClient.post<string>(url, createRequest, {
      responseType: 'text' as 'json'
    });
  };
}
