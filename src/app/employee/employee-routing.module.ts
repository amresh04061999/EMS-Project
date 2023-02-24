import { NgModule, ViewChildren } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeComponent } from './employee.component';

const routes: Routes = [{
  path: '', component: EmployeeComponent,
  children: [{
    path: '',
    pathMatch: "full",
    redirectTo: 'employe-list',
  },
  {
    path: 'employe-list', component: EmployeeListComponent
  },
  ]
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
