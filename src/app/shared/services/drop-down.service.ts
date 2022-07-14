import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TalentNames } from 'src/app/models/talentnames';
export interface DropdownOption {
  value: string;
  viewValue: string;
}
// export interface TalentNames {
//   talentName: string;
// }
@Injectable({
  providedIn: 'root'
})
export class DropDownService {
  constructor(private _httpClient: HttpClient) {}

  getTalentNames = (filterValue: string): Observable<TalentNames[]> => {
    let url = `http://localhost:9090/api/talents/${filterValue}`;
    return this._httpClient.get<TalentNames[]>(url);
  };

  getAllTalents = (): Observable<TalentNames[]> => {
    let url = 'http://localhost:9090/api/talents';
    return this._httpClient.get<TalentNames[]>(url);
  };
}
