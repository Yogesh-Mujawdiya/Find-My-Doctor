import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModule } from '../module/user.module';
import { DoctorModule } from '../module/doctor.module';
import { Observable, from, BehaviorSubject } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  
  HostUrl = environment.HostUrl;
  LoginUrl= "/Login.php";
  DoctorSignUpUrl= "/DoctorSignUp.php";
  UserSignUpUrl= "/UserSignUp.php";
  constructor(private http: HttpClient) {
  }
  
  isLogin():boolean{
    if(localStorage.getItem('currentUserType')==null)
      return false;
    else
      return true;
  }

  getUserType():string{
    return localStorage.getItem('currentUserType');
  }

  getCurrentUser():Observable<UserModule>{
    return new BehaviorSubject<UserModule>(JSON.parse(localStorage.getItem('currentUser')));
  }

  getCurrentDoctor():Observable<DoctorModule>{
    return new BehaviorSubject<DoctorModule>(JSON.parse(localStorage.getItem('currentDoctor')));
  }

  Login(Mobile,Pass):any{
    let body = new FormData();
    body.append('MobileNo', Mobile);
    body.append('Password', Pass);
    return this.http.post<any>(this.HostUrl+this.LoginUrl,body).pipe();  
  }

  UserSignUp(Mobile,Name,Pass,dateOfBirth,Gender):any{
      let body = new FormData();
      body.append('MobileNo', Mobile);
      body.append('FullName', Name);
      body.append('Password', Pass);
      body.append('DOB', dateOfBirth);
      body.append('Gender', Gender);
    return this.http.post<any>(this.HostUrl+this.UserSignUpUrl,body)
      .pipe();  
  }
  DoctorSignUp(Mobile,Name,Pass,address,latitude,longitude,speciality,hospital_Name,
    consultation_Fee,opning_Time,closing_Time):any{
      let body = new FormData();
      body.append('MobileNo', Mobile);
      body.append('FullName', Name);
      body.append('Password', Pass);
      body.append('Address', address);
      body.append('Latitude', latitude);
      body.append('Longitude', longitude);
      body.append('Speciality', speciality);
      body.append('Hospital_Name', hospital_Name);
      body.append('Consultation_Fee', consultation_Fee);
      body.append('Opning_Time', opning_Time);
      body.append('Closing_Time', closing_Time);
    return this.http.post<any>(this.HostUrl+this.DoctorSignUpUrl,body)
      .pipe();  
  }
}
