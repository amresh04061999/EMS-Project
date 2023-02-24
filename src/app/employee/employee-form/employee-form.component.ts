import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { City, Country, State } from 'country-state-city';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { CommunicationService } from '../Services/communication.service';
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
    private _communicationServices:CommunicationService,
    private fb: FormBuilder,) {
      // Multiple Form Group
    this.employeeForm = this.fb.group({
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
    // get Country
    this.countries = Country.getAllCountries();
    // get state
    this.states = State.getAllStates();
    // get city
    this.cities = City.getAllCities();

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
      this._httpSevices.addemployee(this.employeeForm.value).subscribe((res) => {
        if (res) {
          this._closeOverlay.close();
          this._communicationServices.EmployeeData.next(res)
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
}