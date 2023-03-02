import { Employee } from "../employee-form/Employee.model";
/***
 *concat firs name last name
 */
export class MergeFirstnameLastname {
  /**
   * To response
   * @param item
   * @returns response
   */
  public toResponse(item: any) {
    const employeedata: Employee = new Employee();
      // employeedata.id=item.id;
      // employeedata.PersonalDetails!.firstname=item.firstname;
      // employeedata.PersonalDetails!.lastname=item.lastname;
      // employeedata.PersonalDetails!.dob=item.dob;
      // employeedata.PersonalDetails!.email=item.email;
      // employeedata.PersonalDetails!.gender=item.gender;
      // employeedata.PersonalDetails!.country=item.country;
      // employeedata.PersonalDetails!.state=item.state;
      // employeedata.PersonalDetails!.city=item.city;
      // employeedata.JobDetails!.companyname=item.companyname;
      // employeedata.JobDetails!.experience=item.experience;
      // employeedata.JobDetails!.salary=item.salary;
      // employeedata.fullName=item.firstname.concat("",item.lastname)
      return employeedata
  }
}
