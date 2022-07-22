import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from 'src/app/models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(private _httpClient: HttpClient) {}

  getAllProjects = (): Observable<Project[]> => {
    const url = 'http://localhost:9090/api/projects';
    return this._httpClient.get<Project[]>(url);
}
}