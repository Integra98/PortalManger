import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  addMessages: string[] = [];
  deleteMessages: string[] = [];
  updateMessages: string[] = [];
  doneMessages: string[] = [];
  deadlineMessages: string[] = [];

  addEmployee: string[] = [];
  updateEmployee: string[] = [];
  deleteEmployee: string[] = [];
  bdayEmployee: string[] = [];

  date;
  constructor() { }

  pushAdd(message: string) {
    this.addMessages.unshift(message);
    this.date = new Date();
  }

  pushDelete(message: string) {
    this.deleteMessages.unshift(message);
    this.date = new Date();

  }

  pushUpdate(message: string) {
    this.updateMessages.unshift(message);
    this.date = new Date();

  }
  pushDone(message: string) {
    this.doneMessages.unshift(message);
    this.date = new Date();

  }

  pushDeadline(message: string) {
    this.deadlineMessages.unshift(message);
    this.date = new Date();

  }

  deleteAdd(message) {
    const index = this.addMessages.indexOf(message, 0);
    this.addMessages.splice(index, 1);
    this.date = new Date();
  }

  deleteDelete(message) {
    const index = this.deleteMessages.indexOf(message, 0);
    this.deleteMessages.splice(index, 1);
    this.date = new Date();
  }

  deleteUpdate(message) {
    const index = this.updateMessages.indexOf(message, 0);
    this.updateMessages.splice(index, 1);
    this.date = new Date();
  }

  deleteDone(message) {
    const index = this.doneMessages.indexOf(message, 0);
    this.doneMessages.splice(index, 1);
    this.date = new Date();
  }

  deleteDeadline(message) {
    const index = this.deadlineMessages.indexOf(message, 0);
    this.deadlineMessages.splice(index, 1);
    this.date = new Date();

  }

  pushAddEmployee(message: string) {
    this.addEmployee.unshift(message);
    this.date = new Date();

  }

  pushDeleteEmployee(message: string) {
    this.deleteEmployee.unshift(message);
    this.date = new Date();

  }
  pushUpdateEmployee(message: string) {
    this.updateEmployee.unshift(message);
    this.date = new Date();


  }
  pushBDayEmployee(message: string) {
    this.bdayEmployee.unshift(message);
    this.date = new Date();

  }

  deleteAddEmployee(message) {
    const index = this.addEmployee.indexOf(message, 0);
    this.addEmployee.splice(index, 1);
    this.date = new Date();
  }

  deleteDeleteEmployee(message) {
    const index = this.deleteEmployee.indexOf(message, 0);
    this.deleteEmployee.splice(index, 1);
    this.date = new Date();
  }

  deleteUpdateEmployee(message) {
    const index = this.updateEmployee.indexOf(message, 0);
    this.updateEmployee.splice(index, 1);
    this.date = new Date();

  }


  clear() {
    this.addMessages = [];
    this.deleteMessages = [];
    this.updateMessages = [];
    this.doneMessages = [];
    this.deadlineMessages = [];

  }


}
