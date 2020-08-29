import { Component, OnInit } from '@angular/core';
import { LocationServiceService } from '../../service/location-service.service';
import { FormControl } from '@angular/forms';
import { Observable, from } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { AccountService } from '../../service/account.service';
import { DatePipe } from '@angular/common';
import { _SnackBarContainer, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  hide = true;
  Address : string;
  UserType : string = "Customer";
  Gender : string="M";
  Mobile_No : string;
  Date_of_Birth : Date;
  Name : string;
  Speciality : string;
  Password : string;
  Hospital_Name : string;
  Consultation_Fee : string;
  Open_Time : string;
  Close_Time : string;
  
  myControl = new FormControl();
  options: string[] = ['DM Neurologist', 'Neurosurgeon', 'Psychiatrist'];
  filteredOptions: Observable<string[]>;

  
  constructor(private locationService:LocationServiceService,
    private accountService : AccountService,
    private datePipe:DatePipe,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
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

  SignUp(){
    if(this.UserType=="Doctor"){
      this.locationService.getCordinate(this.Address).subscribe(
        data =>{
          let C = data.candidates[0].location;
          console.log(C.x,C.y);
          this.DoctorSignup(C.x,C.y);
        }
      );
      
    }
    else
      this.UserSignup();
  }

  DoctorSignup(latitude,longitude){
    this.accountService.DoctorSignUp(this.Mobile_No,this.Name,
      this.Password,this.Address,latitude,longitude,this.Speciality,this.Hospital_Name,
      this.Consultation_Fee,this.Open_Time,this.Close_Time).subscribe(
        data=>{
          console.log(data);
          this.openSnackBar(data.status,data.message);
        });
  }

  UserSignup(){
    let DOB =  this.datePipe.transform(this.Date_of_Birth,"yyyy-MM-dd");
    this.accountService.UserSignUp(this.Mobile_No,this.Name,
      this.Password,DOB,this.Gender).subscribe(
        data=>{
          console.log(data);
          this.openSnackBar(data.status,data.message);
        });
  }

}
