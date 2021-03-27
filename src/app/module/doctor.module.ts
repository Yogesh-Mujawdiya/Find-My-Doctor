import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class DoctorModule { 
  Id:number;
  Mobile_No:string;
  Full_Name:string;
  Address:string;
  Speciality:string;
  Hospital_Name:string;
  Consultation_Fee:number;
  Opning_Time:string;
  Closing_Time:string;  
  Latitude : number;
  Longitude :number;
  Status:string;
  Distance:number;

}
