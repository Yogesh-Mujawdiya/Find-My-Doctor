import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorService } from '../service/doctor.service';
import { DoctorModule } from '../module/doctor.module';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {
  
  TagName : string = "Home";
  doctor:DoctorModule;
  constructor(private router : Router,
    private doctorService:DoctorService) { 
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
