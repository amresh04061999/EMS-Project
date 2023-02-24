import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class CommunicationService {
  public EmployeeData:Subject<any>;
  // public EmployeeData$:Observable<any>;
  constructor() {
    this.EmployeeData=new Subject();
    // this.EmployeeData$=new Observable();
    // this.EmployeeData$=this.EmployeeData.asObservable()
   }
}
