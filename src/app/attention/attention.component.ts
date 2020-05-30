import { Component, OnInit } from '@angular/core';
import {MessagesService} from '../messages.service';
import {ProjectService} from '../project.service';
import {ApiService} from '../api.service';


@Component({
  selector: 'app-attention',
  templateUrl: './attention.component.html',
  styleUrls: ['./attention.component.css']
})
export class AttentionComponent implements OnInit {

  CurrentDate;
  date;
  projects;
  stopList = [];

  constructor(public messagesService: MessagesService, private apiService: ApiService,
    private projectService: ProjectService) { }

    controlDeadline() {

      for (let i = 0; i < this.projectService.projects.length; i++) {
        if (this.projects[i].deadline === this.getTime()) {
            this.stopList.unshift(this.projects[i].name);
        }
      }
      console.log('ControlStopList');
    }

    controlDelProject() {
      for (let i = 0; i < this.stopList.length; i++) {
        for (let j = 0; j < this.messagesService.deleteMessages.length; j++) {
        if (this.stopList[i] === this.messagesService.deleteMessages[j]) {
          const index = this.stopList.indexOf(this.stopList[i], 0);
          this.stopList.splice(index, 1);
        }
      }
    }
      console.log('ControlStopList');
    }

    controlDoneProject() {
      for (let i = 0; i < this.stopList.length; i++) {
        for (let j = 0; j < this.messagesService.doneMessages.length; j++) {
        if (this.stopList[i] === this.messagesService.doneMessages[j]) {
          const index = this.stopList.indexOf(this.stopList[i], 0);
          this.stopList.splice(index, 1);
        }
      }
    }
    }

    getTime() {
      const date = new Date();
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      this.CurrentDate = (year  + '-' + month + '-' + day);
      return this.CurrentDate;
    }

    deleteDeadline(message) {
      const index = this.stopList.indexOf(message, 0);
      this.stopList.splice(index, 1);

    }

  ngOnInit() {
    this.apiService.getProjects()
    .subscribe( projects => {
      this.projects = projects;
      this.stopList = [];
      this.controlDeadline();
      this.controlDelProject();
      this.controlDoneProject();
      });
  }

}
