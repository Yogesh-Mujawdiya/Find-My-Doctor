import { Component, OnInit } from '@angular/core';
import { DoctorModule } from '../module/doctor.module';
import { Router } from '@angular/router';
import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  TagName : string = "Home";
  doctor:DoctorModule;
  constructor(private router : Router,
    private adminService:AdminService) { 
      
  }

  ngOnInit(): void {

  }

  changeValue(){
    if(this.TagName=='Home'){
      this.GoTo('/admin')
    }else if(this.TagName=='DoctorRequest'){
      this.GoTo('/admin/DoctorRegistrationRequest');
    }else if(this.TagName=='Notification') {
      this.GoTo('/admin/Notification');
    }
  }
  

  GoTo(Url:string){
    this.router.navigateByUrl(Url);
  }

}
