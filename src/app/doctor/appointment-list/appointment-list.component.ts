import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../service/doctor.service';
import { DoctorAppointment } from '../../module/doctor-appointment.module';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {

  AllAppointment:DoctorAppointment[];
  PendingAppointment:DoctorAppointment[];
  ApprovedAppointment:DoctorAppointment[];
  NotApprovedAppointment:DoctorAppointment[];
  constructor(private doctorService:DoctorService,
    private snackBar: MatSnackBar,) {
    this.getData();
  }

  ngOnInit(): void {
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  getData(){
    this.doctorService.myAppointment().subscribe(data=>{
      console.log(data);
      this.PendingAppointment = [];
      this.ApprovedAppointment = [];
      this.NotApprovedAppointment = [];
      this.AllAppointment=<DoctorAppointment[]>data.AppointmentList
      for(let i of this.AllAppointment){
        if(i.Appointment.Status=="Pending"){
          this.PendingAppointment.push(i);
        }else if(i.Appointment.Status=="Approved"){
          this.ApprovedAppointment.push(i);
        }else if(i.Appointment.Status=="Not Approved"){
          this.NotApprovedAppointment.push(i);
        }
      }
    });
  }

  ResponseAppointment(obj:DoctorAppointment,Status:string){
    this.doctorService.ResponseAppointment(obj.Appointment.User_Mobile_No,
      obj.Appointment.Dr_Mobile_No,obj.Appointment.Date_Time,Status).subscribe(data=>{
        console.log(data);
        this.openSnackBar(data.message,data.status);
        this.getData();
      });
  }

}
