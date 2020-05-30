import { Component, OnInit } from '@angular/core';
import {MessagesService} from '../messages.service';
import {ProjectService} from '../project.service';
import {EmployeeService} from '../employee.service';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  CurrentDate;
  date;
  projects;
  employees;
  constructor(public messagesService: MessagesService, private apiService: ApiService,
    private projectService: ProjectService, private employeeService: EmployeeService) { }

  getTime() {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    this.CurrentDate = (year  + '-' + month + '-' + day);
    return this.CurrentDate;
  }

  controlDeadline() {

    for (let i = 0; i < this.projectService.projects.length; i++) {
      if (this.projects[i].deadline === this.getTime()) {
          this.messagesService.pushDeadline('Сегодня крайний срок сдачи проекта: ' + this.projects[i].name);
      }
    }
    console.log('Control');
  }

  ngOnInit() {
    this.apiService.getProjects()
    .subscribe( projects => {
      this.projects = projects;
      this.messagesService.deadlineMessages = [];
      this.controlDeadline();
      });
  }

}
