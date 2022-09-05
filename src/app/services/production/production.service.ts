import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductionNames } from 'src/app/models/productionnames';
/**
 * @author - Awadhesh
 */
@Injectable({
  providedIn: 'root'
})
export class ProductionService {
  constructor(private _httpClient: HttpClient) {}

  /**
   * to get all the production names from the backend
   * @author - Awadhesh
   * @returns 
   */
  getAllProductions = (): Observable<ProductionNames[]> => {
    const url = '/api/productions';
    return this._httpClient.get<ProductionNames[]>(url);
  };
  /**
   * @author - Dibya Prakash Ojha
   * @param productionName 
   * @returns 
   */
  getAllProductionByName = (
    productionName: string
  ): Observable<ProductionNames[]> => {
    const url = '/api/productions/${productionName}';
    return this._httpClient.get<ProductionNames[]>(url);
  };
}
