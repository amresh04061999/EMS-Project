import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class CommunicationService {
  public addEmployeeData:Subject<any>;
  public editEmployeeData:Subject<any>;
  public viewEmployeeData:Subject<any>;
  public statusDelete:Subject<boolean>
  constructor() {
    this.addEmployeeData=new Subject();
    this.editEmployeeData=new Subject();
    this.statusDelete=new Subject()
    this.viewEmployeeData=new Subject()
   }
}
