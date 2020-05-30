import { Component, OnInit } from '@angular/core';
import { Project, ProjectStatus } from '../project';
import { Employee } from '../employee';
import { ProjectService } from '../project.service';
import { EmployeeService } from '../employee.service';

import {ApiService} from '../api.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {
  projects: Project[];
  selProject: Project;
  CurrentDate;
  status: String = 'Выполняется';
  addTask: Boolean = false;
  selTask;
  employees: Employee[];
  endDate;

  constructor(private apiService: ApiService, private projectService: ProjectService,
    private employeeService: EmployeeService, private location: Location) { }

    ngOnInit() {
      this.selProject = this.projectService.getSelectedProject();
      this.employees = this.employeeService.employees;
  
      // this.employeeService.getEmployees()
      // .subscribe( employees => this.employees = employees);
    }

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
    this.selProject.tasks.push(newtask);
    this.addTask = false;
    this.selProject.status = ProjectStatus.performed;
    console.log(this.selProject.tasks);
  }

  deleteTask(task) {
    const index = this.selProject.tasks.indexOf(task, 0);
    this.selProject.tasks.splice(index, 1);

  }

  setSelTask(task) {
    this.selTask = task;
  }

  getSelProject(): void {
    this.selProject = this.projectService.getSelectedProject();
    console.log('Project called');
  }

  editProject() {
    const newProject: Project = {
      _id: this.selProject._id,
      name: this.selProject.name,
      responsible: this.selProject.responsible,
      startDate: this.selProject.startDate,
      status: this.selProject.status,
      endDate: this.selProject.endDate,
      deadline: this.selProject.deadline,
      tasks: this.selProject.tasks
    };

    // this.projectService.updateProject(newProject)
    // .subscribe(result => {
    //   console.log('Project to be updated:' + result);
    //   this.apiService.getProjects();
    // });
    let changedProject = this.projectService.projects.find(x => x._id === this.selProject._id);
    changedProject = newProject;

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



}
