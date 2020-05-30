import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA  } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectsComponent } from './projects/projects.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { EmployeesComponent } from './employees/employees.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { InfoEmployeeComponent } from './info-employee/info-employee.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { InfoProjectComponent } from './info-project/info-project.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { MessagesComponent } from './messages/messages.component';
import { AttentionComponent } from './attention/attention.component';
import { StatisticsComponent } from './statistics/statistics.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    HomepageComponent,
    AddProjectComponent,
    EmployeesComponent,
    AddEmployeeComponent,
    InfoEmployeeComponent,
    EditEmployeeComponent,
    InfoProjectComponent,
    EditProjectComponent,
    MessagesComponent,
    AttentionComponent,
    StatisticsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
