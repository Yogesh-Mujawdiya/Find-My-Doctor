import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModule } from '../module/user.module';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  HostUrl = environment.HostUrl;
  AllDoctorUrl : string = "/AllDoctors.php";
  AppointmentUrl : string = "/RequestAppointment.php";
  MyAppointmentUrl : string = "/MyAppointment.php";
  User:UserModule;
  constructor(private http : HttpClient) {
    console.log(localStorage.getItem('currentUser'));
    this.User = <UserModule>JSON.parse(localStorage.getItem('currentUser'));
  }

  

  getAllDoctor(){
    return this.http.get<any>(this.HostUrl+this.AllDoctorUrl).pipe();
  }
  requestAppointment(Doctor_Mobile:string,Date_Time:string){
    let body = new FormData();
    body.append('User_Mobile', this.User.Mobile);
    body.append('Doctor_Mobile', Doctor_Mobile);
    body.append('Date_Time', Date_Time);
    return this.http.post<any>(this.HostUrl+this.AppointmentUrl,body).pipe();
  }
  myAppointment(){
    let body = new FormData();
    body.append('User_Mobile', this.User.Mobile);
    return this.http.post<any>(this.HostUrl+this.MyAppointmentUrl,body).pipe();
  }
}
