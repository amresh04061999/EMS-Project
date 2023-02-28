import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { OverlayService } from '../core/services/overlay.service';
import { MergeFirstnameLastname } from '../employee/Services/mergeFirstnameLastname.adapter';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    OverlayModule,
    FormsModule

    
  ],exports:[
    ReactiveFormsModule,
    OverlayModule,
    FormsModule
  ],
  providers:[OverlayService,MergeFirstnameLastname]
})
export class SharedModule { }
