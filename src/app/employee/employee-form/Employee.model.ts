export class Employee {
    public PersonalDetails?:PersonalDetails[];
    public JobDetails?:JobDetails[]
}
export class PersonalDetails{
    public firstname:string;
    public lastname:string;
    public dob:number;
    public gender:string;
    public educationtype:string;
    public email:string;
    public country:string;
    public state:string;
    public city:string;
    ProfileImage:any;
    constructor(firstname:string,lastname:string,dob:number,gebder:string,
        educationtype:string,email:string,country:string,state:string,city:string){
       this.firstname=firstname;
       this.lastname=lastname;
       this.dob=dob;
       this.gender=gebder;
       this.educationtype=educationtype;
       this.email=email;
       this.country=country;
       this.state=state;
       this.city=city
    }
}
export class JobDetails{
    public companyname:string;
    public experience:number;
    public salary:number;
    constructor(companyname:string,experience:number,salary:number,){
      this.companyname=companyname;
      this.experience=experience;
      this.salary=salary
    }
}