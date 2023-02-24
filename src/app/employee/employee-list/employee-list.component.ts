import { Component, OnInit } from '@angular/core';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { CommunicationService } from '../Services/communication.service';
import { HttpServiceService } from '../Services/http-service.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  public EmployeeData: any
  constructor(private _openOverlay: OverlayService,
    private _HttpServices: HttpServiceService,
    private _communicationServices:CommunicationService
  ) {

  }
  ngOnInit(): void {
  //  Get Employee Data
  this.getEmployeeDetails()  
  this._communicationServices.EmployeeData.subscribe((res)=>{
   this.EmployeeData.push(res)
  })
  }
  openModel() {
    this._openOverlay.open(EmployeeFormComponent)
  }

  public getEmployeeDetails(): void {
    this._HttpServices.getEmployee().subscribe((res) => {
      if (res) {
        this.EmployeeData =res
        // console.log(res);
        
      }
    })
  }

  
}
