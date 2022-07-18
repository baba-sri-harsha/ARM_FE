import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductionNames } from 'src/app/models/productionnames';

@Injectable({
  providedIn: 'root'
})
export class ProductionService {
  constructor(private _httpClient: HttpClient) {}

  getAllProductions = (): Observable<ProductionNames[]> => {
    const url = 'http://localhost:9090/api/productions';
    return this._httpClient.get<ProductionNames[]>(url);
  };
}
