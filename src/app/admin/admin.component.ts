import { Component, OnInit } from '@angular/core';
import { DoctorModule } from '../module/doctor.module';
import { Router } from '@angular/router';
import { AdminService } from '../service/admin.service';
import { AccountService } from '../service/account.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  TagName : string = "Home";
  doctor:DoctorModule;
  constructor(private router : Router,
    private adminService:AdminService,
    private accountService:AccountService) { 
      setInterval(() => {
        if(this.accountService.getUserType()!='Admin')
          this.router.navigateByUrl('');
      }, 100);
  }

  ngOnInit(): void {

  }

  changeValue(){
    if(this.TagName=='Home'){
      this.GoTo('/admin')
    }else if(this.TagName=='Edit'){
      this.GoTo('/admin/EditData');
    }else if(this.TagName=='Add') {
      this.GoTo('/admin/AddData');
    }
  }
  

  GoTo(Url:string){
    this.router.navigateByUrl(Url);
  }

}
