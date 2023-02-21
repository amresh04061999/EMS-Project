import { Component } from '@angular/core';
import { OverlayService } from 'src/app/core/services/overlay.service';
@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent {
  public imagefile!:File;
  public  base64String:any
  constructor(private closeOverlay:OverlayService) { 


  }
  /**
   * images Select
   * @param event 
   */
  public selectImage(event:any):void{
    if(event){
     this.imagefile=event.target.files[0]
    }
    let reader =new FileReader();
    reader.readAsDataURL(this.imagefile);
    reader.onload=()=>{
    this.base64String=String(reader.result)
      
    }
    
  }
  // close overlay
  public close():void{
    this.closeOverlay.close()
  }
}
