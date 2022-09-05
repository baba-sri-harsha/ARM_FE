import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from 'src/app/models/project';
/**
 * @author - Awadhesh
 */
@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(private _httpClient: HttpClient) {}

  /**
   * to get all the projects available from the backend
   * @returns 
   */
  getAllProjects = (): Observable<Project[]> => {
    const url = '/api/projects';
    return this._httpClient.get<Project[]>(url);
  };
  /**
   * to get all the projcts in a particular prodcution company
   * @author - Dibya Prakash Ojha
   * @param productionId 
   * @returns 
   */
  getProjectsOfTypedProduction = (productionId: any): Observable<Project[]> => {
    return this._httpClient.get<Project[]>(
      `/api/projectNames/productionId/${productionId}`
    );
  };
}
