import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../project.service';
import {ApiService} from '../api.service';

import {Project, Task} from '../project';
import {Employee} from '../employee';
import {EmployeeService} from '../employee.service';
import { Location } from '@angular/common';



@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css'],
  providers: [ProjectService]
})
export class AddProjectComponent implements OnInit {

  projects: Project[];
  project: Project;
  tasks: Task[] = [];
  employees: Employee[];
  addTask: Boolean = false;
  selTask;
  CurrentDate;
  status: String = 'Выполняется';
  SDate;
  endDate;
  constructor(private projectService: ProjectService, private employeeService: EmployeeService,
    private apiService: ApiService, private location: Location) { }

  newTask(TaskName, TaskResponsible, defenition) {
    const newtask = {
      taskName: TaskName,
      responsible: TaskResponsible,
      defenition: defenition,
      startDate: this.getTime(),
      endDate: this.endDate,
      status: this.status,
      taskBought: false
    };
    this.tasks.push(newtask);
    this.addTask = false;
    console.log(this.tasks);
  }

  deleteTask(task) {
    this.tasks.splice(task, 1);

  }

  setSelTask(task) {
    this.selTask = task;
  }

  setStartDate() {
    if (this.SDate === undefined) {
      this.SDate = this.getTime();
    } else {
      this.SDate = this.SDate;
    }
    return this.SDate;
  }

  addProject(name, responsible, deadline) {
    const newProject = {
      name: name,
      tasks: this.tasks,
      responsible: responsible,
      status: this.status,
      startDate: this.setStartDate(),
      deadline: deadline,
    };
    this.projectService.addProject(newProject)
    .subscribe(project => {
      this.projects.push(project);
      this.apiService.getProjects()
    .subscribe(projects =>
      this.projectService.projects = projects
      );
    });
    console.log(newProject);
    this.goBack();

  }

  getTime() {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    this.CurrentDate = (year + '-' + day + '-' + month);
    return this.CurrentDate;
  }

  goBack(): void {
    this.location.back();
  }


  ngOnInit() {
    this.employeeService.getEmployees()
    .subscribe( employees => this.employees = employees);

    this.projectService.getProjects()
    .subscribe(projects =>
      this.projects = projects
      );


  }


}
