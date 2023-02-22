import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { City, Country, State } from 'country-state-city';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { HttpServiceService } from '../Services/http-service.service';
@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {
  public imagefile!: File;
  public base64String!: string;
  public employeeForm: FormGroup;
  public PersonalDetails!:FormGroup
  public JobDetails!:FormGroup
  public countries: any = [];
  public states: any = [];
  public cities: any = [];
  public state: any = [];
  public city: any = [];
  public isSubmited:boolean;
  public checkdata:boolean =false;
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
    private fb: FormBuilder,) {
    this.employeeForm = this.fb.group({
      PersonalDetails: this.fb.group({
        firstname: ['', [Validators.required]],
        lastname: ['', [Validators.required]],
        dob: ['', [Validators.required]],
        gender: ['', [Validators.required]],
        educationtype: ['', [Validators.required]],
        email: ['', [Validators.required]],
        country: ['', [Validators.required]],
        state: ['', [Validators.required]],
        city: ['', [Validators.required]],
        ProfileImage: ['']
      }),
      JobDetails: this.fb.group({
        Companyname: ['', [Validators.required]],
        Experience: ['', [Validators.required]],
        salary: ['', [Validators.required]],
      }),

    })
    this.isSubmited=false;
    console.log(this.employeeForm);
    
  }
  ngOnInit(): void {
    // get  all country
    this.countries = Country.getAllCountries();
    this.states = State.getAllStates();
    this.cities = City.getAllCities();
    // console.log(this.countries);
    // console.log(this.states);
    
  }
  // Save Employee data
  /**
     * images Select
     * @param event 
     */
  public selectImage(event: any): void {
    if (event) {
      this.imagefile = event.target.files[0]
    }
    let reader = new FileReader();
    reader.readAsDataURL(this.imagefile);
    reader.onload = () => {
      this.base64String = String(reader.result)
    }
  }

  //save employee
  public saveEmployeeData() {
       this.isSubmited=true
    if(this.employeeForm.invalid){
      this.employeeForm.get('PersonalDetails')?.get('ProfileImage')?.setValue(this.base64String)
      this._httpSevices.addemployee(this.employeeForm.value).subscribe((res) => {
        if(res){
          this._closeOverlay.close()
        }
      })
    }
  }
  // Dependency   
  /**
   * Select country Dependency state
   * @param event 
   */
  public onCountryChange(event: any): void {
    let eventString: string = event.target.value.toUpperCase()
      this.state = this.states.filter((res: any) => eventString === res.countryCode);
    // this.states.filter((res:any=[])=>{ 
    //  const c = res.isoCode.includes(eventString);
    //   if(c){
    //   const b=res.name
    //    console.log(b);
       
    //   }
//   if(c){
// const b= res.name;
//       console.log(b);
//      event.target.value=b
//     }
  // })
    // console.log(eventString);
    
    // console.log(eventString);
    

  }
  /**
   * Select state Dependency city
   * @param event 
   */
  public onStateChange(event: any): void {
    let eventString = event.target.value;
    this.city = this.cities.filter((res: any) => eventString === res.stateCode);
  }
  // close overlay
  public close(): void {
    this._closeOverlay.close()
  }
  // validation function
  
  get PersonalDetail() {
    return this.employeeForm.controls;      
  }
  get JobDetail() {
    return this.employeeForm.controls;
  }
}
