import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { DoctorModule } from 'src/app/module/doctor.module';
import { UserService } from 'src/app/service/user.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogAppointmentComponent } from '../DialogAppointment/dialog-appointment.component';
import { LocationServiceService } from 'src/app/service/location-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { AccountService } from 'src/app/service/account.service';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/service/common.service';
import { SpecialityModule } from 'src/app/module/speciality.module';

@Component({
  selector: 'app-find-doctor',
  templateUrl: './find-doctor.component.html',
  styleUrls: ['./find-doctor.component.css']
})
export class FindDoctorComponent implements OnInit {
  AllDoctor:DoctorModule[]; 
  Doctors:DoctorModule[];
  Distance : any[];
  searchText:string = '';
  SelectedSpeciality:string = '';
  Speciality = [ ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  obs: Observable<any>;
  dataSource: MatTableDataSource<DoctorModule> ;

  SortBy : string = "Distance";

  constructor(private userService:UserService,
    private locationService:LocationServiceService,
    public dialog: MatDialog,
    private accountService : AccountService,
    private changeDetectorRef: ChangeDetectorRef,
    private commonService:CommonService,
    private router: Router) {
      this.GetSpeciality();
  }

  

  GetSpeciality(){
    this.commonService.getDoctorSpeciality().subscribe(data=>{
      console.log(data);
      let AllSpeciality = <SpecialityModule[]>data.SpecialityList;     
      this.Speciality = [];
      this.Speciality.push("All");
      for(let o of AllSpeciality)
        this.Speciality.push(o.Name);
    });
    
  }
  ngOnInit(): void { 
    this.userService.getAllDoctor().subscribe(data =>{
      this.AllDoctor = <DoctorModule[]>data.DoctorList;
      let i=0;
      for(let O of this.AllDoctor){
       this.locationService.getCurrentLocation().then(pos=>{
          O.Distance = this.calculateDistance(pos.lat,pos.lng,O.Longitude,O.Latitude);
        });
      }
      this.Doctors=this.AllDoctor;
      this.AllDoctor.sort((a:DoctorModule, b:DoctorModule) => (a.Distance - b.Distance));
      this.updateData(this.AllDoctor);
    });
  }

  ChangeSortingType(){
    if(this.SortBy=="Distance")
      this.Doctors.sort((a:DoctorModule, b:DoctorModule) => (a.Distance - b.Distance));
    else if (this.SortBy == "Fee")
      this.Doctors.sort((a:DoctorModule, b:DoctorModule) => (a.Consultation_Fee - b.Consultation_Fee));
    this.updateData(this.Doctors);
  }
  ngOnDestroy() {
    if (this.dataSource) { 
      this.dataSource.disconnect(); 
    }
  }

  ChangeSpeciality(){
    this.Doctors=<DoctorModule[]> [];
    if(this.SelectedSpeciality=="All"){
      this.Doctors = <DoctorModule[]>this.AllDoctor;
    }else{
      for(let obj of this.AllDoctor)
        if(obj.Speciality == this.SelectedSpeciality)
          this.Doctors.push(obj);
    }
    this.Doctors.sort((a:DoctorModule, b:DoctorModule) => (a.Distance - b.Distance));
    this.updateData(this.Doctors);
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
    for(let obj of this.Doctors)
      if(this.isAvailable(obj))
        Data.push(obj);
    this.updateData(Data);
  }
  updateData(data:DoctorModule[]){
    this.dataSource = new MatTableDataSource<DoctorModule>(data);
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.obs = this.dataSource.connect();
  }
  openDialog(doctor:DoctorModule): void {
    const dialogRef = this.dialog.open(DialogAppointmentComponent, {
      data: doctor
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  SetAppointment(doctor:DoctorModule){
    if(this.accountService.isLogin())
      this.openDialog(doctor);
    else
      window.open("https://find--my--doctor.herokuapp.com/Account/Login", "_blank");
      // this.router.navigateByUrl('Account/Login');
  }


  calculateDistance(lat1:number,lon1:number,lat2:number,lon2:number):number{
    var R = 6371; // km
    var dLat = this.toRad(lat2-lat1);
    var dLon = this.toRad(lon2-lon1);
    var lat1 = this.toRad(lat1);
    var lat2 = this.toRad(lat2);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c;
    return parseFloat(d.toFixed(2));
  }
  
  toRad(Value) 
  {
    return Value * Math.PI / 180;
  }
}
