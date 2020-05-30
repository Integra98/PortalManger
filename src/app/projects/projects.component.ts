import { Component, OnInit, EventEmitter } from '@angular/core';
import {ProjectService} from '../project.service';
import {ApiService} from '../api.service';
import {MessagesService} from '../messages.service';
import {Project} from '../project';
import { delay } from 'q';
import { AttentionComponent } from '../attention/attention.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],

})
export class ProjectsComponent implements OnInit {
  projects: Project[];
  selProject: Project;
  name: string;
  load: Boolean = false;
  CurrentDate;
  constructor(private projectService: ProjectService, private apiService: ApiService,
    private messagesService: MessagesService) {}

    ngOnInit() {
      this.projects = this.projectService.projects; 
      // .subscribe( projects => {
      //   this.projects = projects;
      //   });
      this.getSelProject();
    }


  onSelect(project: Project) {
    this.projectService.setSelectedProject(project);
  }

  deleteProject(id: any) {
    const projects = this.projects;
    this.projectService.deleteProject(id)
    .subscribe(data => {
      if (data.n === 1) {
        for (let i = 0; i < this.projects.length; i++) {
            if (projects[i]._id === id) {
              this.messagesService.pushDelete('Название: ' + projects[i].name);
              projects.splice(i, 1);

            }
        }
      }
    });

  }

  getSelProject(): void {
    this.selProject = this.projectService.getSelectedProject();
    console.log('Project called');
  }

  getTime() {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    this.CurrentDate = (year  + '-' + month + '-' + day);
    return this.CurrentDate;
  }






}
