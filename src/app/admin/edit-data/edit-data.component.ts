import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
import { DoctorModule } from 'src/app/module/doctor.module';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl } from '@angular/forms';
import { LocationServiceService } from 'src/app/service/location-service.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogEditDoctorComponent } from '../dialog-edit-doctor/dialog-edit-doctor.component';
import { MatDialog } from '@angular/material/dialog';
import { NotificationModule } from 'src/app/module/notification.module';
import { SpecialityModule } from 'src/app/module/speciality.module';

@Component({
  selector: 'app-edit-data',
  templateUrl: './edit-data.component.html',
  styleUrls: ['./edit-data.component.css']
})
export class EditDataComponent implements OnInit {
    
  IsProgressing:boolean;
  myControl = new FormControl();
  Specialitys: string[] = [];
  filteredOptions: Observable<string[]>;

  
  AllDoctors:DoctorModule[];
  AllNotification:NotificationModule[];
  AllSpeciality:SpecialityModule[];
  ApprovedDoctor:DoctorModule[];
  NotApprovedDoctor:DoctorModule[];
  PendingDoctor:DoctorModule[];

  Doctors:DoctorModule[];
  Distance : any[];
  searchText:string = '';
  SelectedSpeciality:string = "All";

  @ViewChild(MatPaginator) paginator: MatPaginator;
  obs: Observable<any>;
  dataSource: MatTableDataSource<DoctorModule> ;

  Request : string = "Pending"

  constructor(private locationService:LocationServiceService,
    private adminService:AdminService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar) {
    this.GetData();
    this.GetNotification();
    this.GetSpeciality();
  }

  ngOnInit(): void {
    
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  GetNotification(){
    this.adminService.getNotification().subscribe(data=>{
      console.log(data);
      this.AllNotification = <NotificationModule[]>data.NotificationList;     
    });
  }

  GetSpeciality(){
    this.adminService.getSpeciality().subscribe(data=>{
      console.log(data);
      this.AllSpeciality = <SpecialityModule[]>data.SpecialityList;     
      this.Specialitys = [];
      this.Specialitys.push("All");
      for(let o of this.AllSpeciality)
        this.Specialitys.push(o.Name);
    });
    
  }

  GetData(){
    this.adminService.getDoctorRequest().subscribe(data=>{
      console.log(data);
      this.ApprovedDoctor = [];
      this.NotApprovedDoctor = [];
      this.PendingDoctor = [];
      this.AllDoctors = <DoctorModule[]>data.DoctorList;
      this.ChangeRequest();
    });
  }


  isAvailable(D:DoctorModule):boolean{
    if(D.Address.toLowerCase().search(this.searchText.toLowerCase())!=-1){
      return true;
    }else if(D.Hospital_Name.toLowerCase().search(this.searchText.toLowerCase())!=-1){
      return true;
    }else if(D.Speciality.toLowerCase().search(this.searchText.toLowerCase())!=-1){
      return true;
    }else if(D.Full_Name.toLowerCase().search(this.searchText.toLowerCase())!=-1){
      return true;
    }
    return false;
  }
  
  SearchData(){
    this.SelectedSpeciality = "All";
    let Data:DoctorModule[] = [];
    for(let obj of this.AllDoctors)
      if(this.isAvailable(obj) && obj.Status == this.Request)
        Data.push(obj);
    this.Doctors=<DoctorModule[]> Data;
    this.updateData(this.Doctors);
  }

  updateData(data:DoctorModule[]){
    this.dataSource = new MatTableDataSource<DoctorModule>(data);
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.obs = this.dataSource.connect();
  }

  ChangeSpeciality(){
    this.Doctors=<DoctorModule[]> [];
    if(this.SelectedSpeciality=="All"){
      this.Doctors = <DoctorModule[]>this.AllDoctors;
    }else{
      for(let obj of this.AllDoctors)
        if(obj.Speciality == this.SelectedSpeciality)
          this.Doctors.push(obj);
    }
    this.updateData(this.Doctors);
  }
  
  ChangeRequest(){
    this.Doctors=<DoctorModule[]> [];
    for(let obj of this.AllDoctors)
      if(obj.Status == this.Request && this.isAvailable(obj))
        this.Doctors.push(obj);
    this.updateData(this.Doctors);
  }
  
  ResponseRegistrationRequest(obj:DoctorModule,Status:string){
    this.adminService.setDoctorStatus(obj.Mobile_No,Status).subscribe(data=>{
        console.log(data);
        this.openSnackBar(data.message,data.status);
        this.GetData();
      });
  }

  

  EditDoctor(doctor:DoctorModule):void{
    const dialogRef = this.dialog.open(DialogEditDoctorComponent, {
      data: doctor
    });
  }
  DeleteDoctor(obj:DoctorModule){
    if(confirm("Are you sure to delete Dr. "+obj.Full_Name)) {
      this.adminService.DeleteDoctor(obj.Mobile_No).subscribe(
        data=>{
          this.openSnackBar(data.message,data.status)
          this.GetData();
        }
      );
    }
  }
  
  DeleteNotification(obj:NotificationModule){
    if(confirm("Are you sure to delete !!")) {
      this.adminService.deleteNotification(obj.Id).subscribe(
        data=>{
          this.openSnackBar(data.message,data.status)
          this.GetNotification();
        }
      );
    }
  }
  
  DeleteSpeciality(obj:SpecialityModule){
    if(confirm("Are you sure to delete "+obj.Name)) {
      this.adminService.deleteSpeciality(obj.Id).subscribe(
        data=>{
          this.openSnackBar(data.message,data.status)
          this.GetSpeciality();
        }
      );
    }
  }

  GoTo(Url:string){
    this.router.navigateByUrl(Url);
  }
}
