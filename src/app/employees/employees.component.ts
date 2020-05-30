import { Component, OnInit } from '@angular/core';
import {Employee} from '../employee';
import {EmployeeService} from '../employee.service';
import {ApiService} from '../api.service';
import {MessagesService} from '../messages.service';
import { ProjectService } from '../project.service';


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],

})
export class EmployeesComponent implements OnInit {

  employees = [];
  projects = [];
  employee: Employee;
  first_name: string;
  last_name: string;
  selEmployee: Employee;
  empProjects = [];

  constructor(private employeeService: EmployeeService, private apiService: ApiService,
    private messagesService: MessagesService, private projectService: ProjectService) { }

  getSelEmployee(): void {
    this.selEmployee = this.employeeService.getSelectedEmployee();
  }

  onSelect(employee: Employee) {
      this.employeeService.setSelectedEmployee(employee);
    }


  deleteEmployee(id: any) {
    const employees = this.employees;
    this.employeeService.deleteEmployee(id)
    .subscribe(data => {
      if (data.n === 1) {
        for (let i = 0; i < this.employees.length; i++) {
            if (employees[i]._id === id) {
              this.messagesService.pushDeleteEmployee('Сотрудник: ' + employees[i].first_name + ' ' + employees[i].last_name);
              employees.splice(i, 1);

            }
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
    .subscribe( employees => this.employees = employees);

    this.apiService.getProjects()
    .subscribe( projects => this.projects = projects);

    this.getSelEmployee();
    this.getEmployeesProjects();
  }

}
