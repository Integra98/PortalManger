import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import {Employee} from './employee';
import { EmployeeService } from './employee.service';
import { ProjectService } from './project.service';
import { MessagesService } from './messages.service';
import { AttentionComponent } from './attention/attention.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'client';
  messagesLenght: number;

// tslint:disable-next-line:max-line-length
constructor(private apiService: ApiService, private employeeService: EmployeeService,
  private projectService: ProjectService, private messagesService: MessagesService,
 ) {}

  ngOnInit(): void {
    this.apiService.getEmployees()
    .subscribe(employees => {
      this.employeeService.employees = employees;
    });

      this.apiService.getProjects()
    .subscribe(projects => {
      this.projectService.projects = projects;
      console.log('Projects loaded');
    });

  }

}

