import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Employee } from '../employee-form/Employee.model';
import { MergeFirstnameLastname } from './mergeFirstnameLastname.adapter';

@Injectable()
export class HttpServiceService {
  private baseUrl:any
  constructor(private _httpServices:HttpClient,
    private mergeFirstnameLastname:MergeFirstnameLastname) {
       this.baseUrl=environment.baseUrl;
   }

/**
 * Add Employee
 * @param employee 
 * @returns 
 */
   addemployee(employee:any):Observable<Employee>{
    return this._httpServices.post<Employee>(`${this.baseUrl}employee`,employee)
   }
   
   /**
    * Get employee details
    * @returns 
    */
   getEmployee():Observable<Employee[]>{
    return this._httpServices.get<Employee[]>(`${this.baseUrl}employee`)
    // .pipe(map((item:any) =>{
    //   console.log(item);
    //   return item.map((item:any)=>this.mergeFirstnameLastname.toResponse(item) )
    // }))
   }
   /**
    * Delete Employee
    * @param id 
    * @returns 
    */
   deleteEmployee(id:number):Observable<Employee>{
    return this._httpServices.delete<Employee>(`${this.baseUrl}employee/`+ id)
   }

  editemployee(employee:Employee,id:any):Observable<Employee>
  {
    return this._httpServices.put<Employee>(`${this.baseUrl}employee/`+ id,employee)

  }
}

