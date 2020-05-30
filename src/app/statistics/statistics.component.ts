import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { ProjectService } from '../project.service';
import { EmployeeService } from '../employee.service';
import {ApiService} from '../api.service';


@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  @ViewChild('myCanvas') myCanvas: ElementRef;
    public context: CanvasRenderingContext2D;

    chart = [];
    employees = [];
    projects = [];
    namesEmployees = [];
    projectsEmployees = [];
    empProjects = [];

  constructor(private projectService: ProjectService, private employeeService: EmployeeService,
    private apiService: ApiService) { }


  getChart() {

    const barChartData = {
    labels: this.employeeService.namesEmployees,
    datasets: [{
    label: 'Колличество проектов',
    backgroundColor: '#1e90ff',
    borderColor: '#1e90ff',
    borderWidth: 1,
    data: this.employeeService.projectsEmployees
    }]
    };
    this.context = (<HTMLCanvasElement>this.myCanvas.nativeElement).getContext('2d');
        this.chart = new Chart(this.context, {
          type: 'bar',
          data: barChartData,
          options : {
            scales: {
                xAxes: [{
                    gridLines: {
                        offsetGridLines: true
                    }
                }]
            }
        }
          });

  }

  getEmployeesProjects() {
    for (let i = 0; i < this.employees.length; i++) {
      for (let j = 0; j < this.projects.length; j++) {
      if (this.employees[i]._id === this.projectService.projects[j].responsible._id ) {
        this.empProjects.push(this.projectService.projects[j]);
        this.employees[i].Projects = this.empProjects;
      }
    }
  }
  }

  ngOnInit() {
    this.apiService.getEmployees()
    .subscribe( employees => {
      this.employees = employees;
      this.namesEmployees = this.employeeService.getNamesEmployees();
    });

    this.apiService.getProjects()
    .subscribe( projects => {
      this.projects = projects;
      this.projectsEmployees = this.employeeService.getProjectsEmployees();
    });
    this.getEmployeesProjects();
    this.getChart();
  }

}
