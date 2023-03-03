import { Component, ElementRef, ViewChild } from '@angular/core';
import { EmployeeFormComponent } from 'src/app/employee/employee-form/employee-form.component';
import { OverlayService } from '../services/overlay.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent {
  flag: boolean = true;
  constructor(private overlayService:OverlayService){

  }
}
