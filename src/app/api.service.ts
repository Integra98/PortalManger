import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Employee } from './employee';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppComponent } from './app.component';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: Http) { }
  getProjects() {
    return this.http.get('http://localhost:3000/api/projects')
    .pipe(map(res => res.json()));
  }

  getEmployees() {
    return this.http.get('http://localhost:3000/api/employees')
    .pipe(map(res => res.json()));
  }

  addEmployee(newEmployee) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/employee', newEmployee, {headers: headers})
    .pipe(map(res => res.json()));
  }

  deleteEmployee(id) {
    return this.http.delete('http://localhost:3000/api/employee/' + id)
    .pipe(map(res => res.json()));
  }

  getEmployee(id) {
    return this.http.get('http://localhost:3000/api/getemployee/' + id)
    .pipe(map(res => res.json()));
  }
}
