import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { City, Country, State } from 'country-state-city';
import { OverlayService } from 'src/app/core/services/overlay.service';
@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {
  public imagefile!: File;
  public base64String!: string;
  public employeeForm:FormGroup;
  public countries: any=[];
  public states: any =[];
  public cities: any =[];
  public state: any=[];
  public city: any =[];
  public educationType=[
    {
      id:1,education:"Post Graduate",
    },
    {
      id:2,education:"Under Graduate",
    }
  ]
  constructor(private closeOverlay: OverlayService,private fb:FormBuilder) {

   this.employeeForm=this.fb.group({
    firstname:['',[Validators.required]],
    lastname:['',[Validators.required]],
    dob:['',[Validators.required]],
    gender:['',[Validators.required]],
    educationtype:['',[Validators.required]],
    country:['',[Validators.required]],
    state:['',[Validators.required]],
    city:['',[Validators.required]],
    Companyname:['',[Validators.required]],
    Experience:['',[Validators.required]],
    salry:['',[Validators.required]],
    })
  }
  ngOnInit(): void {
    // get  all country
    this.countries = Country.getAllCountries();
    this.states = State.getAllStates();
    this.cities = City.getAllCities()
    console.log(this.countries);
    
  }
// Save Employee data

public saveEmployeeData():void{


}








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
  // Dependency   
  /**
   * Select country Dependency state
   * @param event 
   */
  public onCountryChange(event: any): void {
   let eventString: string = event.target.value.toUpperCase()
   console.log(eventString);
   
   this.state= this.states.filter((res: any) => eventString === res.countryCode);
  }
  /**
   * Select state Dependency city
   * @param event 
   */
  public onStateChange(event: any): void {
       let eventString=event.target.value;
       this.city = this.cities.filter((res: any) => eventString === res.stateCode);
  }
  // close overlay
  public close(): void {
    this.closeOverlay.close()
  }
}
