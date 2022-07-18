import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TalentNames } from 'src/app/models/talentnames';

@Injectable({
  providedIn: 'root'
})
export class TalentService {
  constructor(private _httpClient: HttpClient) {}

  getAllTalents = (): Observable<TalentNames[]> => {
    const url = 'http://localhost:9090/api/talents';
    return this._httpClient.get<TalentNames[]>(url);
  };
}
