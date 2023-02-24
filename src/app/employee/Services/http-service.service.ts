import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable()
export class HttpServiceService {
  private baseUrl:any
  constructor(private _httpServices:HttpClient) {
       this.baseUrl=environment.baseUrl;
   }


/**
 * Add Employee
 * @param employee 
 * @returns 
 */
   addemployee(employee:any):Observable<any>{
    return this._httpServices.post<any>(`${this.baseUrl}employee`,employee)
   }
   /**
    * Get employee details
    * @returns 
    */
   getEmployee():Observable<any>{
    return this._httpServices.get<any>(`${this.baseUrl}employee`)
   }
}
