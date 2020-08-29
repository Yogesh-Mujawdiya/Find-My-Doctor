import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
import { DoctorModule } from 'src/app/module/doctor.module';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-doctor-registration-approvel',
  templateUrl: './doctor-registration-approvel.component.html',
  styleUrls: ['./doctor-registration-approvel.component.css']
})
export class DoctorRegistrationApprovelComponent implements OnInit {
    
  AllDoctors:DoctorModule[];
  ApprovedDoctor:DoctorModule[];
  NotApprovedDoctor:DoctorModule[];
  PendingDoctor:DoctorModule[];
  constructor(private adminService:AdminService,
    private snackBar: MatSnackBar) {
    this.GetData();
  }

  ngOnInit(): void {
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  GetData(){
    this.adminService.getDoctorRequest().subscribe(data=>{
      console.log(data);
      this.ApprovedDoctor = [];
      this.NotApprovedDoctor = [];
      this.PendingDoctor = [];
      this.AllDoctors = <DoctorModule[]>data.DoctorList;
      for(let i of this.AllDoctors){
        if(i.Status=="Pending"){
          this.PendingDoctor.push(i);
        }
        else if(i.Status=="Approved"){
          this.ApprovedDoctor.push(i);
        }
        else if(i.Status=="Not Approved"){
          this.NotApprovedDoctor.push(i);
        }
      }
    });
  }

  
  ResponseRegistrationRequest(obj:DoctorModule,Status:string){
    this.adminService.setDoctorStatus(obj.Mobile_No,Status).subscribe(data=>{
        console.log(data);
        this.openSnackBar(data.message,data.status);
        this.GetData();
      });
  }

}
