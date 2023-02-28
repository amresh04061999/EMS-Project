import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { CommunicationService } from '../Services/communication.service';

@Component({
  selector: 'app-delete-confirm-box',
  templateUrl: './delete-confirm-box.component.html',
  styleUrls: ['./delete-confirm-box.component.scss']
})
export class DeleteConfirmBoxComponent {
constructor(private _OvelayServices:OverlayService,
  private CommunicationServices:CommunicationService
  ){
}
  public dismiss():void{
      this._OvelayServices.close()
  }
  public decline():void{
    this._OvelayServices.close()
  }
  public accept(boolean:boolean){
    this.CommunicationServices.statusDelete.next(true)
  }
}
