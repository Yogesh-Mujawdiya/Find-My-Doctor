import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class DoctorModule { 
  Mobile_No:string;
  Full_Name:string;
  Address:string;
  Speciality:string;
  Hospital_Name:string;
  Consultation_Fee:string;
  Opning_Time:string;
  Closing_Time:string;  
  Status:string;
}
