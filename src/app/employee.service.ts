import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Employee } from './employee';
import {ApiService} from './api.service';
import { map } from 'rxjs/internal/operators/map';
import { Observable, of } from 'rxjs';
import {MessagesService} from './messages.service';



@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  selEmployee: Employee;
  selEmpId;
  employees: Employee[] = [
    { _id: '1', first_name: 'FirstName1', last_name: 'LastName1', DateOfBirth: '01-01-1998', Position: 'programmer', Email: '123@gmail.com', Phone: 87076543454, Photo: 'https://www.firestock.ru/download/s/1mgs931an63rxrj/11087.jpg?dl=0', Projects: []},
    { _id: '2', first_name: 'FirstName2', last_name: 'LastName2', DateOfBirth: '01-01-1998', Position: 'programmer', Email: '123@gmail.com', Phone: 87076543454, Photo: 'https://sfera-info.com/wp-content/uploads/2019/03/453afbaa8b7f9dfa76f67cbaa84d4043_fitted_740x0.jpg', Projects: []},
    { _id: '3', first_name: 'FirstName3', last_name: 'LastName3', DateOfBirth: '01-01-1998', Position: 'programmer', Email: '123@gmail.com', Phone: 87076543454, Photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrpY6C9fVhS1ro_WrCLQx3fDUuHJpaiw0oxkHtmTz9ThyR_bHQ&s', Projects: []},
    { _id: '4', first_name: 'FirstName4', last_name: 'LastName4', DateOfBirth: '01-01-1998', Position: 'programmer', Email: '123@gmail.com', Phone: 87076543454, Photo: 'https://lamcdn.net/lookatme.ru/post_image-image/9wKriEVJcwuYpdujRQzAKg-article.jpg', Projects: []},

    
  ];
  namesEmployees: String[] = [];
  projectsEmployees: Number[] = [];


  constructor(private http: Http, private apiService: ApiService, private messagesService: MessagesService) {}


  returnEmployees(): Observable<Employee[]> {
    return of(this.employees);
  }

  addEmployee(newEmployee) {
    this.messagesService.pushAddEmployee('Название: ' + newEmployee.first_name + ' ' + newEmployee.last_name);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/employee', newEmployee, {headers: headers})
    .pipe(map(res => res.json()));
  }

  deleteEmployee(id) {
    return this.http.delete('http://localhost:3000/api/employee/' + id)
    .pipe(map(res => res.json()));
  }

  updateEmployee(newEmployee) {
    this.messagesService.pushUpdateEmployee('Сотрудник: ' + newEmployee.first_name + ' ' + newEmployee.last_name);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('http://localhost:3000/api/updateemployee/' + newEmployee._id, newEmployee, {headers: headers})
    .pipe(map(res => res.json()));
  }

  setSelectedEmployee(employee: Employee) {
    this.selEmployee = employee;
    console.log(this.selEmployee);

  }

  getSelectedEmployee(): Employee {
    console.log(this.selEmployee);
    return this.selEmployee;

  }

  getEmployees() {
    return this.http.get('http://localhost:3000/api/employees')
    .pipe(map(res => res.json()));
  }

  getNamesEmployees() {
    this.namesEmployees = [];
    for (let i = 0; i < this.employees.length; i++) {
      this.namesEmployees.push(this.employees[i].first_name + ' ' + this.employees[i].last_name);
    }
    console.log(this.namesEmployees);
    return this.namesEmployees;
  }

  getProjectsEmployees() {
    this.projectsEmployees = [];
    for (let i = 0; i < this.employees.length; i++) {
      this.projectsEmployees.push(this.employees[i].Projects.length);
    }
    console.log(this.projectsEmployees);
    return this.projectsEmployees;
  }


}
