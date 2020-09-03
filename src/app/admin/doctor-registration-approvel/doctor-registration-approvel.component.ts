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

@Component({
  selector: 'app-doctor-registration-approvel',
  templateUrl: './doctor-registration-approvel.component.html',
  styleUrls: ['./doctor-registration-approvel.component.css']
})
export class DoctorRegistrationApprovelComponent implements OnInit {
    
  Address : string = '';
  Mobile_No : string = '';
  Name : string = '';
  Speciality : string = '';
  Hospital_Name : string = '';
  Consultation_Fee : string = '';
  Open_Time : string = '';
  Close_Time : string = '';
  IsProgressing:boolean;
  myControl = new FormControl();
  options: string[] = [
    'Physician','Physician (Ayurvedic)','Physician (Homeopathy)',
    'Cardiologist','Neurologist','Gastroenterologist','Orthopedic',
    'Dermatologist','Gynaecologist','Psychologist','Oncologist','Others'
  ];
  Specialitys: string[] = ['All',
    'Physician','Physician (Ayurvedic)','Physician (Homeopathy)',
    'Cardiologist','Neurologist','Gastroenterologist','Orthopedic',
    'Dermatologist','Gynaecologist','Psychologist','Oncologist','Others'
  ];
  filteredOptions: Observable<string[]>;

  
  AllDoctors:DoctorModule[];
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
    private snackBar: MatSnackBar) {
    this.GetData();
  }

  ngOnInit(): void {
    
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
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
      this.ChangeRequest();
    });
  }

  

  GetAddress(){
    this.locationService.getCurrentLocation().then(pos=>
      {
         this.locationService.getAddress(pos.lng,pos.lat).subscribe(
           data=>{
             console.log(data);
             this.Address = data.address.LongLabel;
           }
         )
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

  DeleteDoctor(obj:DoctorModule){
    if(confirm("Are you sure to delete Dr. "+obj.Full_Name)) {
      this.adminService.DeleteDoctor(obj.Mobile_No).subscribe(
        data=>{
          this.openSnackBar(data.message,data.ststus)
          this.GetData();
        }
      );
    }
  }
  
  AddDoctor(){
    if(this.Mobile_No=='' || this.Name=='' || this.Address=='' || this.Speciality=='' ||
    this.Hospital_Name=='' || this.Consultation_Fee=='' || this.Open_Time=='' || this.Close_Time=='')
      return;
    if(this.options.indexOf(this.Speciality)==-1){
      this.openSnackBar("If Dr. Speciality is not Available Select Others","Error")
      return;
    }
    this.IsProgressing=true;
    this.locationService.getCordinate(this.Address).subscribe(
      data =>{
        let C = data.candidates[0].location;
        this.AddData(C.x,C.y);
      }
    );
  }

  AddData(latitude,longitude){
    this.adminService.AddDoctor(this.Mobile_No,this.Name,this.Address,latitude,longitude,this.Speciality,this.Hospital_Name,
      this.Consultation_Fee,this.Open_Time,this.Close_Time).subscribe(
        data=>{
          this.IsProgressing=false;
          this.openSnackBar(data.message,data.status);
        });
  }



  GoTo(Url:string){
    this.router.navigateByUrl(Url);
  }
}
