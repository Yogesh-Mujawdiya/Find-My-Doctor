import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberValueAccessor } from '@angular/forms';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class UserModule {
  Id:number;
  Mobile:string;
  Name:string;
  DOB:string;
  Gender:string;
}