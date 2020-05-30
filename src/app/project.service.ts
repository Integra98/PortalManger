import { EmployeeService } from './employee.service';
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
  projects: Project[] = [
    { _id: '1', name: 'First project', status: 'Выполняется', responsible: this.employeeService.employees[0], startDate: '01-01-2020', endDate: '30-01-2020', deadline: '30-01-2020', tasks: [
 {      taskName: 'Задача первая', status: 'Выполнено', responsible: this.employeeService.employees[0], startDate: '01-01-2020', endDate: '01-01-2020', defenition: 'Описание к задаче', taskBought: true},
 {      taskName: 'Задача вторая', status: 'Выполнено', responsible: this.employeeService.employees[1], startDate: '01-01-2020', endDate: '01-01-2020', defenition: 'Описание к задаче', taskBought: true},
 {      taskName: 'Задача третья', status: 'Выполняется', responsible: this.employeeService.employees[1], startDate: '01-01-2020', endDate: '01-01-2020', defenition: 'Описание к задаче', taskBought: false},
 {      taskName: 'Задача четвертая', status: 'Выполняется', responsible: this.employeeService.employees[1], startDate: '01-01-2020', endDate: '01-01-2020', defenition: 'Описание к задаче', taskBought: false},
 {      taskName: 'Задача пятая', status: 'Выполняется', responsible: this.employeeService.employees[1], startDate: '01-01-2020', endDate: '01-01-2020', defenition: 'Описание к задаче', taskBought: false}
    ]},
    { _id: '2', name: 'Second project', status: 'Выполняется', responsible: this.employeeService.employees[1], startDate: '01-01-2020', endDate: '30-01-2020', deadline: '30-01-2020', tasks: []},
    { _id: '3', name: 'Third project', status: 'Выполняется', responsible: this.employeeService.employees[2], startDate: '01-01-2020', endDate: '30-01-2020', deadline: '30-01-2020', tasks: []},
    { _id: '4', name: 'Fourth project', status: 'Выполняется', responsible: this.employeeService.employees[0], startDate: '01-01-2020', endDate: '30-01-2020', deadline: '30-01-2020', tasks: []}
  ];
  selProject: Project;
  load: Boolean;

  constructor(private http: Http, private messagesService: MessagesService, private employeeService: EmployeeService) { }

  returnProjects(): Observable<Project[]> {
    return of(this.projects);
  }

  getProjects() {
    // return this.http.get('http://localhost:3000/api/projects')
    // .pipe(map(res => res.json()));
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
