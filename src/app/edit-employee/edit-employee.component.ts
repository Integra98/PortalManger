import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {ApiService} from '../api.service';
import { Location } from '@angular/common';



@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EditEmployeeComponent implements OnInit {
  selEmployee;
  employees: Employee[];
  constructor(private employeeService: EmployeeService, private apiService: ApiService, private location: Location) { }

  getSelEmployee(): void {
    this.selEmployee = this.employeeService.getSelectedEmployee();
    console.log('Employee called');
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

    this.goBack();
  }

  updateEmployee(first_name, last_name, DateOfBirth, Position, Email, Phone) {
    const newEmployee = {
      first_name: first_name,
      last_name: last_name,
      DateOfBirth: DateOfBirth,
      Position: Position,
      Email: Email,
      Phone: Phone

    };
    this.employeeService.updateEmployee(newEmployee)
    .subscribe(employee => {
      this.employees.push(employee);
      this.apiService.getEmployees()
    .subscribe(employees =>
      this.employees = employees
      );
    });
    this.goBack();
  }

  goBack(): void {
    this.location.back();
  }

  ngOnInit() {
    this.getSelEmployee();
  }



}
