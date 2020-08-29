import { Component, OnInit } from '@angular/core';
import { DoctorModule } from 'src/app/module/doctor.module';
import { UserService } from 'src/app/service/user.service';
import { UserModule } from 'src/app/module/user.module';
import { AccountService } from 'src/app/service/account.service';
import { MyAppointmentModule } from '../../module/my-appointment.module';

@Component({
  selector: 'app-my-appointment',
  templateUrl: './my-appointment.component.html',
  styleUrls: ['./my-appointment.component.css']
})
export class MyAppointmentComponent implements OnInit {

  MyAppointment: MyAppointmentModule[];
  User:UserModule;

  constructor(private userService:UserService,private accountService:AccountService){
    userService.myAppointment().subscribe(data=>{
      console.log(data);
      this.MyAppointment=<MyAppointmentModule[]>data.AppointmentList;
      console.log(this.MyAppointment);
    });
  }
  
  ngOnInit(): void {
    
  }



}
