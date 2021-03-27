import { Component, OnInit } from '@angular/core';
import { LocationServiceService } from '../../service/location-service.service';
import { FormControl } from '@angular/forms';
import { Observable, from } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { AccountService } from '../../service/account.service';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/service/common.service';
import { SpecialityModule } from 'src/app/module/speciality.module';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  hide = true;
  Address : string = '';
  UserType : string = "Customer";
  Gender : string="M";
  Mobile_No : string = '';
  Date_of_Birth : Date;
  Name : string = '';
  Speciality : string = '';
  Password : string = '';
  Hospital_Name : string = '';
  Consultation_Fee : string = '';
  Open_Time : string = '';
  Close_Time : string = '';
  IsProgressing:boolean;
  myControl = new FormControl();
  options: string[] ;
  filteredOptions: Observable<string[]>;

  
  constructor(private locationService:LocationServiceService,
    private accountService : AccountService,
    private datePipe:DatePipe,
    private snackBar: MatSnackBar,
    private commonService : CommonService,
    private router: Router) { 
      if(accountService.isLogin())
        this.GoTo('');
      this.GetSpeciality();
    }

    
  GetSpeciality(){
    this.commonService.getDoctorSpeciality().subscribe(data=>{
      console.log(data);
      let AllSpeciality = <SpecialityModule[]>data.SpecialityList;     
      this.options = [];
      this.options.push("All");
      for(let o of AllSpeciality)
        this.options.push(o.Name);
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    });
  }

  ngOnInit(): void {
  }

  
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }


  GoTo(Url:string){
    this.router.navigateByUrl(Url);
  }

  SignUp(){
    if(this.Mobile_No=='' || this.Name=='' || this.Password =='')
      return;
    if(this.UserType=="Doctor"){
      if(this.Address=='' || this.Speciality=='' ||this.Hospital_Name=='' || this.Consultation_Fee=='' || this.Open_Time=='' || this.Close_Time=='')
        return;
      if(this.options.indexOf(this.Speciality)==-1){
        this.openSnackBar("If Dr. Speciality is not Available Select Others","Error")
        return;
      }
      this.IsProgressing=true;
      this.locationService.getCurrentLocation().then(pos=>{
          this.DoctorSignup(pos.lng,pos.lat);
        }
      );
      
    }
    else{
      this.IsProgressing = true;
      this.UserSignup();
    }
  }

  DoctorSignup(latitude,longitude){
    this.accountService.DoctorSignUp(this.Mobile_No,this.Name,
      this.Password,this.Address,latitude,longitude,this.Speciality,this.Hospital_Name,
      this.Consultation_Fee,this.Open_Time,this.Close_Time).subscribe(
        data=>{
          this.IsProgressing=false;
          this.openSnackBar(data.message,data.status);
          this.GoTo('Account/Login');
        });
  }

  UserSignup(){
    let DOB =  this.datePipe.transform(this.Date_of_Birth,"yyyy-MM-dd");
    this.accountService.UserSignUp(this.Mobile_No,this.Name,
      this.Password,DOB,this.Gender).subscribe(
        data=>{
          this.IsProgressing=false;
          this.openSnackBar(data.message,data.status);
          this.GoTo('Account/Login');
        });
  }

}
