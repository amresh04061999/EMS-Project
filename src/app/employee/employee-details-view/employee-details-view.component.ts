import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../employee-form/Employee.model';
import { CommunicationService } from '../Services/communication.service';
import { HttpServiceService } from '../Services/http-service.service';

@Component({
  selector: 'app-employee-details-view',
  templateUrl: './employee-details-view.component.html',
  styleUrls: ['./employee-details-view.component.scss']
})
export class EmployeeDetailsViewComponent implements OnInit {
  public employeeData:any;
   public id!:number;
  constructor(private _httpService:HttpServiceService,
    private activatedRouter:ActivatedRoute){
    this.activatedRouter.params.subscribe((res:any)=>{
      this.id=res['id']
    })

  }
  ngOnInit(): void {
    this.getemployeedata()  
  }
  // get employee details
  public getemployeedata(){
    this._httpService.getEmployeById(this.id).subscribe((res:any)=>{
    this.employeeData=res
    })
  }
}
