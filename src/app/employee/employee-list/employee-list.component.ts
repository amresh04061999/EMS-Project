import { getLocaleFirstDayOfWeek } from '@angular/common';
import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { DeleteConfirmBoxComponent } from '../delete-confirm-box/delete-confirm-box.component';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { Employee } from '../employee-form/Employee.model';
import { CommunicationService } from '../Services/communication.service';
import { HttpServiceService } from '../Services/http-service.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  public employeeList:any;
  public gander:any
  public confirm:boolean;
  public id!:number;
  public search!:string;
  constructor(private _openOverlay: OverlayService,
    private _HttpServices: HttpServiceService,
    private _communicationServices:CommunicationService,
    private router:Router
  ) {

   this.confirm=false;
    
  }
 
  ngOnInit(): void {
  //  Get Employee Data
  this.getEmployeeDetails()  
  // getGander
  this.getGander()

  // employee data push in employee list using subject
  this._communicationServices.addEmployeeData.subscribe((res)=>{
   this.employeeList.push(res);
  })
  this._communicationServices.editEmployeeData.subscribe((result)=>{
    const postionNo=this.employeeList.findIndex((value:any)=> value.id==result.id  
    );
    
    this.employeeList.splice(postionNo,1,result)
  })
  // delete employee with open pop using subject
  this._communicationServices.statusDelete.subscribe((res)=>{
    if(res){
      this._HttpServices.deleteEmployee(this.id).subscribe((res:any)=>{
      })
      this.getEmployeeDetails() 
      this._openOverlay.close()
    }
   })
  }
  // open employee forn
  openModel() {
    this._openOverlay.open(EmployeeFormComponent)
  }
/**
 * Employee get
 */
  public getEmployeeDetails(): void {
    this._HttpServices.getEmployee().subscribe((res) => {
      if (res) {
        this.employeeList =res
      }
    })
  }
  // delete employee
  public deleteEmployee(id:number){
    this.id=id
    this._openOverlay.open(DeleteConfirmBoxComponent)
     
  }
  /**
   * 
   * @param item Edit Employee
   */
  editEmployee(item:Employee){
   const image =item.PersonalDetails?.ProfileImage;
   const overlayInstance= this._openOverlay.open(EmployeeFormComponent);
   overlayInstance.instance.employeeForm.patchValue(item)
   overlayInstance.instance.base64String=image
  }
/**
 * get employee Details
 * @param item 
 */
 public employeeDetails(item:any):void{
   this.router.navigate(['employee/employee-details',item.id])
  }
  /**
   * get gander
   */
 public getGander():void{
   this._HttpServices.getGander().subscribe((res)=>{
     this.gander=res
   })
   }

}
