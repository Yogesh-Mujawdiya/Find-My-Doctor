import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentModule } from '../module/appointment.module'
import { UserModule } from '../module/user.module'

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class DoctorAppointment { 
  Appointment : AppointmentModule;
  User : UserModule;
}
