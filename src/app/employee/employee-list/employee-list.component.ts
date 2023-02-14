import { Component } from '@angular/core';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent {
  constructor(private openOverlay:OverlayService) { 

  }
  openModel(){
  this.openOverlay.open(EmployeeFormComponent)
  }
}
