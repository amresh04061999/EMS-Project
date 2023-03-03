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
  public employeeList: any;
  public sortList: any
  public gender: any
  public confirm: boolean;
  public id!: number;
  public search!: string;
  public countries: any = [];
  public states: any = [];
  public cities: any = [];
  public state: any = [];
  public city: any = [];
  public displayNone: string
  constructor(private _openOverlay: OverlayService,
    private _httpServices: HttpServiceService,
    private _communicationServices: CommunicationService,
    private router: Router
  ) {

    this.confirm = false;
    this.displayNone = 'none'

  }

  ngOnInit(): void {
    //  Get Employee Data
    this.getEmployeeDetails()
    // getGander
    this.getGender();
    // get countries
    this.getCountries();
    // get states
    this.getStates();
    // get cities
    this.getCities();

    // employee data push in employee list using subject
    this._communicationServices.addEmployeeData.subscribe((res) => {
      this.employeeList.push(res);
    })
    this._communicationServices.editEmployeeData.subscribe((result) => {
      const postionNo = this.employeeList.findIndex((value: any) => value.id == result.id
      );

      this.employeeList.splice(postionNo, 1, result)
    })
    // delete employee with open pop using subject
    this._communicationServices.statusDelete.subscribe((res) => {
      if (res) {
        this._httpServices.deleteEmployee(this.id).subscribe((res: any) => {
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
    this._httpServices.getEmployee().subscribe((res) => {
      if (res) {
        this.sortList = res
        this.employeeList = this.sortList;

      }
    })
  }

  // delete employee
  public deleteEmployee(id: number) {
    this.id = id
    this._openOverlay.open(DeleteConfirmBoxComponent)

  }
  /**
   * 
   * @param item Edit Employee
   */
  editEmployee(item: Employee) {
    const image = item.PersonalDetails?.ProfileImage;
    const overlayInstance = this._openOverlay.open(EmployeeFormComponent);
    overlayInstance.instance.employeeForm.patchValue(item)
    overlayInstance.instance.base64String = image
  }
  /**
   * get employee Details
   * @param item 
   */
  public employeeDetails(item: any): void {
    this.router.navigate(['employee/employee-details', item.id])
  }
  /**
   * get gander
   */
  public getGender(): void {
    this._httpServices.getGander().subscribe((res) => {
      this.gender = res
    })
  }
  //  shortng by gender
  public shortingByGender(event: any) {
    const gender = (event.target.value).toLowerCase()
    if(gender === "all"){
      this.employeeList = this.sortList;
    }else{
      this.employeeList=this.sortList.filter((item: any) => gender == item.PersonalDetails.gender);
    }
  }
  /**
* getCountries
*/
  public getCountries(): void {
    this._httpServices.getCountry().subscribe((res: any) => {
      this.countries = res
    })
  }
  /**
   * getStates
   */
  public getStates(): void {
    this._httpServices.getState().subscribe((res: any) => {
      if (res) {
        this.state = res
      }
    })
  }
  /**
   * getcities
   */
  public getCities(): void {
    this._httpServices.getCity().subscribe((res: any) => {
      if (res) {
        this.city = res
      }
    })

  }
  // Dependency   
  /**
   * Select country Dependency state
   * @param event 
   */
  public onCountryChange(event: any): void {
    let countryId = event.target.value
    this.states = this.state.filter((item: any) => countryId == item.countryId);
    this.employeeList = this.sortList.filter((item: any) => countryId == item.PersonalDetails.country);

  }

  /**
   * Select state Dependency city
   * @param event 
   */
  public onStateChange(event: any): void {
    let stateId = event.target.value;
    this.cities = this.city.filter((item: any) => stateId == item.stateId);
    this.employeeList = this.sortList.filter((item: any) => stateId == item.PersonalDetails.state);
    // if (this.employeeList.length == 0) {
    //   this.displayNone = ''
    // } else {
    //   this.displayNone = 'none'
    // }

  }
  public onCityChange(event: any) {
    let cityId = event.target.value;
    this.employeeList = this.sortList.filter((item: any) => cityId == item.PersonalDetails.city)
    // if (this.employeeList.length == 0) {
    //   this.displayNone = ''
    // } else {
    //   this.displayNone = 'none'
    // }

  }

}
