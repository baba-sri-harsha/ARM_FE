import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TalentNames } from 'src/app/models/talentnames';
/**
 * @author - Awadhesh
 */
@Injectable({
  providedIn: 'root'
})
export class TalentService {
  constructor(private _httpClient: HttpClient) {}
  /**
   * to get all the talents from the backend
   * @author - Awadhesh
   * @returns 
   */
  getAllTalents = (): Observable<TalentNames[]> => {
    const url = '/api/talents';
    return this._httpClient.get<TalentNames[]>(url);
  };
  /**
   * to get all the talents available in a particular project from the backend
   * @param productionId 
   * @param projectNames 
   * @returns 
   */
  getTalentsOfTypedProject = (
    productionId: any,
    projectNames: any
  ): Observable<TalentNames[]> => {
    return this._httpClient.get<TalentNames[]>(
      `/api/projectNames/productionId/${productionId}/typedProjectName/${projectNames}`
    );
  };
}
