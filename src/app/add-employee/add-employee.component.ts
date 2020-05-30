import { Component, OnInit } from '@angular/core';
import {EmployeeService} from '../employee.service';
import {Employee} from '../employee';
import { Location } from '@angular/common';


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
  providers: [EmployeeService]
})
export class AddEmployeeComponent implements OnInit {

  employees: Employee[];
  employee: Employee;


  constructor(private employeeService: EmployeeService, private location: Location) { }

  addEmployee(first_name, last_name, DateOfBirth, Position, Email, Phone, Photo) {
    const newEmployee = {
      first_name: first_name,
      last_name: last_name,
      DateOfBirth: DateOfBirth,
      Position: Position,
      Email: Email,
      Phone: Phone,
      Photo: Photo
    };
    this.employeeService.addEmployee(newEmployee)
    .subscribe(employee => {
      this.employees.push(employee);
      this.employeeService.getEmployees()
    .subscribe(employees =>
      this.employeeService.employees = employees
      );
    });
    console.log(newEmployee);
    this.goBack();
  }

  goBack(): void {
    this.location.back();
  }

  ngOnInit() {
    this.employeeService.getEmployees()
    .subscribe( employees => this.employees = employees);
  }

}
