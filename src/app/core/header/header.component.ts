import { Component } from '@angular/core';
import { ProfileMenuComponent } from '../profile-menu/profile-menu.component';
import { OverlayService } from '../services/overlay.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private overlayService:OverlayService){

  }
/**
 * Open Frofile image
 */
  public profileMenu():void{
  this.overlayService.open(ProfileMenuComponent)

  }
}
