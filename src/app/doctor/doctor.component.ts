import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorService } from '../service/doctor.service';
import { DoctorModule } from '../module/doctor.module';
import { AccountService } from '../service/account.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {
  
  TagName : string = "Home";
  doctor:DoctorModule;
  constructor(private router : Router,
    private doctorService:DoctorService,
    private accountService:AccountService){
    setInterval(() => {
      if(this.accountService.getUserType()!='Doctor')
        this.router.navigateByUrl('');
    }, 100);
    this.doctor = doctorService.getDoctor();
  }

  ngOnInit(): void {

  }

  changeValue(){
    alert("Hello");
    if(this.TagName=='Home'){
      this.GoTo('/doctor')
    }else if(this.TagName=='AppointmentRequest'){
      this.GoTo('/doctor/AppointmentRequest');
    }else if(this.TagName=='AppointmentList') {
      this.GoTo('/doctor/AppointmentList');
    }
  }
  

  GoTo(Url:string){
    this.router.navigateByUrl(Url);
  }
}
