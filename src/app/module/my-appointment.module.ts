import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentModule } from '../module/appointment.module'
import { DoctorModule } from '../module/doctor.module'

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class MyAppointmentModule { 
  Appointment : AppointmentModule;
  Doctor : DoctorModule;
}
