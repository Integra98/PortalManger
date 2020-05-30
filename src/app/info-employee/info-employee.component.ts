import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import {MessagesService} from '../messages.service';
import { Location } from '@angular/common';
import { ProjectService } from '../project.service';
import { Project } from '../project';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-info-employee',
  templateUrl: './info-employee.component.html',
  styleUrls: ['./info-employee.component.css'],

})
export class InfoEmployeeComponent implements OnInit {
  employees: Employee[];
  selEmployee;
  employeesProjects = [];
  Photo: String = 'https://img.icons8.com/cotton/200/000000/gender-neutral-user.png';

  constructor(private employeeService: EmployeeService, private messagesService: MessagesService,
    private projectService: ProjectService, private location: Location, private apiService: ApiService) { }


    ngOnInit() {
      this.getSelEmployee();
      this.getEmployeesProjects();
  
    }

  getSelEmployee(): void {
    this.selEmployee = this.employeeService.getSelectedEmployee();
    // debugger;
    if (this.employeeService.getSelectedEmployee().Photo === undefined) {
      this.selEmployee.Photo = this.Photo;
    }
    console.log('Employee called');
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

    this.goBack();
  }

  getEmployeesProjects() {
    for (let i = 0; i < this.projectService.projects.length; i++) {
      if (this.selEmployee._id === this.projectService.projects[i].responsible._id ) {
        this.employeesProjects.push(this.projectService.projects[i]);
        this.selEmployee.Projects = this.employeesProjects;
        this.editEmployee();
      }
    }
  }

  editEmployee() {
    const newEmployee: Employee = {
      _id: this.selEmployee._id,
      first_name: this.selEmployee.first_name,
      last_name: this.selEmployee.last_name,
      DateOfBirth: this.selEmployee.DateOfBirth,
      Position: this.selEmployee.Position,
      Email: this.selEmployee.Email,
      Phone: this.selEmployee.Phone,
      Photo: this.selEmployee.Photo,
      Projects: this.selEmployee.Projects
    };

    this.employeeService.updateEmployee(newEmployee)
    .subscribe(result => {
      console.log('Employee to be updated:' + result);
      this.employeeService.getEmployees();
      this.apiService.getEmployees();

    });
  }

  onSelectProject(project: Project) {
    this.projectService.setSelectedProject(project);
  }

  goBack(): void {
    this.location.back();
  }




}
