import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { AsideComponent } from './aside/aside.component';
import { RouterModule } from '@angular/router';
import { OverlayService } from './services/overlay.service';
import {OverlayModule} from '@angular/cdk/overlay';



@NgModule({
  declarations: [
    HeaderComponent,
    AsideComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    OverlayModule
  ],
  exports:[
    HeaderComponent,
    AsideComponent,
  ],
  providers:[OverlayService]
})
export class CoreModule { }
