import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class AppointmentModule { 
  Id:number;
  User_Mobile_No:string;
  Dr_Mobile_No:string;
  Date_Time:string;
  Status:string;
}
