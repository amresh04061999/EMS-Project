import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { CommunicationService } from '../Services/communication.service';
import { HttpServiceService } from '../Services/http-service.service';
import { Employee } from './Employee.model';
@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {
  public imagefile!: File;
  public base64String!: string;
  public employeeForm: FormGroup;
  public PersonalDetails!: FormGroup
  public JobDetails!: FormGroup
  public countries: any = [];
  public states: any = [];
  public cities: any = [];
  public state: any = [];
  public city: any = [];
  public isSubmited: boolean;
  public checkdata: boolean = false;
  public msg: string;
  public educationType = [
    {
      id: 1, education: "Post Graduate",
    },
    {
      id: 2, education: "Under Graduate",
    }
  ]
  constructor(private _closeOverlay: OverlayService,
    private _httpSevices: HttpServiceService,
    private _communicationServices: CommunicationService,
    private fb: FormBuilder,) {
    // Multiple Form Group
    this.employeeForm = this.fb.group({
      id: [''],
      PersonalDetails: this.fb.group({
        firstname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40), Validators.pattern('^[a-zA-Z \-\']+')]],
        lastname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40), Validators.pattern('^[a-zA-Z \-\']+')]],
        dob: ['', [Validators.required]],
        gender: ['male', [Validators.required]],
        educationtype: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.pattern('^[a-z0-9]([a-z0-9\-\.]*)+@(([a-z0-9-]{2,})+\.)+[a-z\-]{2,4}$')]],
        country: ['', [Validators.required]],
        state: ['', [Validators.required]],
        city: ['', [Validators.required]],
        ProfileImage: ['']
      }),
      JobDetails: this.fb.group({
        companyname: ['', [Validators.required]],
        experience: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
        salary: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      }),
    })
    this.isSubmited = false;
    this.msg = ""
  }

  ngOnInit(): void {
    // get countries
    this.getCountries();
    // get states
    this.getStates();
    // get cities
    this.getCities();

  }

  // Save Employee data
  /**
     * images Select
     * @param event 
     */
  public selectImage(event: any): void {
    /**
    *show message validation
    */
    let imageType = event.target.files[0]
    if (!imageType.name.match('\.(jpg|jpeg|png|heif)$')) {
      this.msg = "Please upload a valid file format (Supported file  formats: .jpg, .png, .jpeg, .heif).";

      return
    }
    // load image and preview
    if (event) {
      this.imagefile = event.target.files[0]

    }
    let reader = new FileReader();
    reader.readAsDataURL(this.imagefile);
    reader.onload = () => {
      this.base64String = String(reader.result)
      this.msg = ''
    }
  }

  /**
   * Save Employee Details
   */
  public saveEmployeeData() {
    this.isSubmited = true
    if (this.employeeForm.valid) {
      this.employeeForm.get('PersonalDetails')?.get('ProfileImage')?.setValue(this.base64String)
      if (this.employeeForm.value.id) {
        // edit employee
        this._httpSevices.editemployee(this.employeeForm.value, this.employeeForm.value.id).subscribe((res: Employee) => {
          this._closeOverlay.close();
          this._communicationServices.editEmployeeData.next(res)
        })
      } else {
        // add employee
        this._httpSevices.addemployee(this.employeeForm.value).subscribe((res: Employee) => {
          if (res) {
            this._closeOverlay.close();
            this._communicationServices.addEmployeeData.next(res)
          }
        })
      }


    }
  }
/**
 * getCountries
 */
  public getCountries():void{
   this._httpSevices.getCountry().subscribe((res:any)=>{
    this.countries=res
     
   })
  }
  /**
   * getStates
   */
  public getStates():void{
    this._httpSevices.getState().subscribe((res:any)=>{
      if(res){
        this.state=res 
      }
     
      
    })
  }
  /**
   * getcities
   */
  public getCities():void{
    this._httpSevices.getCity().subscribe((res:any)=>{
    if(res){
      this.city=res
    }
    })
    
  }

  // Dependency   
  /**
   * Select country Dependency state
   * @param event 
   */
  public onCountryChange(event: any): void {
    let countryId= event.target.value
    console.log();
    this.states = this.state.filter((item: any) =>countryId == item.countryId);
  }

  /**
   * Select state Dependency city
   * @param event 
   */
  public onStateChange(event: any): void {
    let stateId = event.target.value;
    console.log(stateId);
    
   this.cities= this.city.filter((item: any) =>stateId == item.stateId);
    
  }

  // close overlay
  public close(): void {
    this._closeOverlay.close()
  }
}