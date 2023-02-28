import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';
import { CommunicationService } from './Services/communication.service';
import { HttpServiceService } from './Services/http-service.service';
import { DeleteConfirmBoxComponent } from './delete-confirm-box/delete-confirm-box.component';
@NgModule({
  declarations: [
    EmployeeComponent,
    EmployeeFormComponent,
    EmployeeListComponent,
    DeleteConfirmBoxComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    SharedModule
  ],
  bootstrap: [EmployeeFormComponent],
  providers: [HttpServiceService,CommunicationService],
})
export class EmployeeModule { }
