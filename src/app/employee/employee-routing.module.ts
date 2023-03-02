import { NgModule, ViewChildren } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeDetailsViewComponent } from './employee-details-view/employee-details-view.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeComponent } from './employee.component';

const routes: Routes = [{
  path: '', component: EmployeeComponent,
  children: [{
    path: '',
    pathMatch: "full",
    redirectTo: 'employee-list',
  },
  {
    path: 'employee-list', component: EmployeeListComponent
  },
  {
    path: 'employee-details/:id', component: EmployeeDetailsViewComponent
  },
  
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
