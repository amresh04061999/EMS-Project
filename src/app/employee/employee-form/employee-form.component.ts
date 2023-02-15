import { Component } from '@angular/core';
import { OverlayService } from 'src/app/core/services/overlay.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent {
  constructor(private closeOverlay:OverlayService) { 

  }
  public close(){
    this.closeOverlay.close()

  }
}
