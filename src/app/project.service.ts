import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Project } from './project';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {MessagesService} from './messages.service';


@Injectable({
  providedIn: 'root'
})

export class ProjectService {
  projects: Project[];
  selProject: Project;
  load: Boolean;

  constructor(private http: Http, private messagesService: MessagesService) { }

  returnProjects(): Observable<Project[]> {
    return of(this.projects);
  }

  getProjects() {
    return this.http.get('http://localhost:3000/api/projects')
    .pipe(map(res => res.json()));
  }

  addProject(newProject) {
    this.messagesService.pushAdd('Название: ' + newProject.name);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/project', newProject, {headers: headers})
    .pipe(map(res => res.json()));
  }

  updateProject(newProject) {
    this.messagesService.pushUpdate('Название: ' + newProject.name);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('http://localhost:3000/api/updateproject/' + newProject._id, newProject, {headers: headers})
    .pipe(map(res => res.json()));
  }

  deleteProject(id) {
    return this.http.delete('http://localhost:3000/api/project/' + id)
    .pipe(map(res => res.json()));
  }

  setSelectedProject(project: Project) {
    this.selProject = project;
    console.log(this.selProject);

  }

  getSelectedProject(): Project {
    console.log(this.selProject);
    return this.selProject;

  }
}
