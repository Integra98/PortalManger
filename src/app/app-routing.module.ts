import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
import { StatisticsComponent } from './statistics/statistics.component';



const routes: Routes = [

  {path: 'homepage', component: HomepageComponent},
  {path: 'statistics', component: StatisticsComponent },


  {path: 'projects', component: ProjectsComponent },
  {path: 'add-project', component: AddProjectComponent },
  {path: 'edit-project', component: EditProjectComponent },
  {path: 'info-project', component: InfoProjectComponent },


  {path: 'employees', component: EmployeesComponent},
  {path: 'add-employee', component: AddEmployeeComponent },
  {path: 'edit-employee', component: EditEmployeeComponent },
  {path: 'info-employee', component: InfoEmployeeComponent },
  {path: '', component: MessagesComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
