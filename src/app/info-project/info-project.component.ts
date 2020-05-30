import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Project , Task, ProjectStatus} from '../project';
import { ProjectService } from '../project.service';
import { EmployeeService } from '../employee.service';
import {Employee} from '../employee';
import { ApiService } from '../api.service';
import {MessagesService} from '../messages.service';
import { Location } from '@angular/common';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-info-project',
  templateUrl: './info-project.component.html',
  styleUrls: ['./info-project.component.css']
})

export class InfoProjectComponent implements OnInit {

  @ViewChild('myCanvas') myCanvas: ElementRef;
    public context: CanvasRenderingContext2D;

  projects: Project[];
  selProject: Project;
  selTask: Task;
  status: Boolean;
  CurrentDate;
  doneProgress: number;
  performedProgress: number;

  Photo;
  noPhoto: String = 'https://img.icons8.com/cotton/200/000000/gender-neutral-user.png';
  undefinedPhoto: String = 'https://img.icons8.com/ios/200/000000/help.png';

  chart = [];

  // tslint:disable-next-line:max-line-length
  constructor(private projectService: ProjectService, private apiService: ApiService,
    private employeeService: EmployeeService, private messagesService: MessagesService,
    private location: Location) { }

  onSelect(employee: Employee) {
    this.employeeService.setSelectedEmployee(employee);
  }


  toggleStatus() {
    if (this.selTask.status === ProjectStatus.performed) {
      this.selTask.status = ProjectStatus.done;
    } else {
      this.selTask.status = ProjectStatus.performed;
    }
    this.selTask.endDate = this.getTime();
    this.controlStatus(this.selProject);
    this.getChart();
    // tslint:disable-next-line:max-line-length
    this.editProject(this.selProject._id, this.selProject.name, this.selProject.responsible, this.selProject.startDate, this.selProject.status, this.CurrentDate, this.selProject.endDate, this.selProject.tasks);
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

  editProject(id, name, responsible, startDate, status, endDate, deadline, tasks) {
    const newProject: Project = {
      _id: id,
      name: name,
      responsible: responsible,
      startDate: startDate,
      status: status,
      endDate: endDate,
      deadline: deadline,
      tasks: tasks
    };

    this.projectService.updateProject(newProject)
    .subscribe(result => {
      console.log('Project to be updated:' + result);
      this.apiService.getProjects();
    });

  }

  controlStatus(project: Project) {
    let i;
    let st = 0;
    for ( i = 0; i < project.tasks.length; i++) {
      if (project.tasks[i].status === ProjectStatus.done) {
        st += 1;
      }
    }
    if (st === project.tasks.length) {
      this.selProject.status = ProjectStatus.done;
      this.messagesService.pushDone('Название: ' + project.name);
      this.getTime();
    } else {
      this.selProject.status = ProjectStatus.performed;
    }
  }

  getSelTask(task) {
    this.selTask = task;
  }

  getSelProject(): void {
    this.selProject = this.projectService.getSelectedProject();
    if (this.projectService.getSelectedProject().responsible === undefined) {
      this.Photo = this.undefinedPhoto;
    } else if (this.projectService.getSelectedProject().responsible.Photo === undefined) {
      this.Photo = this.noPhoto;
    } else {
      this.Photo = this.selProject.responsible.Photo;
    }

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

  goBack(): void {
    this.location.back();
  }


  getDoneProcess() {
    let done = 0;
    for (let i = 0; i < this.selProject.tasks.length; i++) {
      if (this.selProject.tasks[i].status === ProjectStatus.done) {
        done = done + 1;
      }
    }

    this.doneProgress = (done / this.selProject.tasks.length ) * 100;
    return this.doneProgress;
  }
  getPerformedProcess() {
    let done = 0 ;
    for (let i = 0; i < this.selProject.tasks.length; i++) {
      if (this.selProject.tasks[i].status === ProjectStatus.done) {
        done += 1;
      }
    }
    this.performedProgress = 100 - ((done / this.selProject.tasks.length ) * 100);
    return this.performedProgress;
  }

  getChart() {
    this.context = (<HTMLCanvasElement>this.myCanvas.nativeElement).getContext('2d');
        this.chart = new Chart(this.context, {
          type: 'pie',
          data: {
            datasets: [{
              data: [
                this.getDoneProcess(),
                this.getPerformedProcess()
              ],
              backgroundColor: [
                '#1cac78',
                '#b8b799'
              ],
              label: 'Dataset 1'
            }],
            labels: [
              'Выполнено',
              'Выполняется'
            ]
          },
          options: {
            responsive: true
          }
          });

  }


  ngOnInit() {
    this.getSelProject();
    this.getChart();
  }


}
