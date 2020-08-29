import { Injectable } from '@angular/core';
import { DoctorModule } from '../module/doctor.module';
import { HttpClient } from '@angular/common/http';
import { UserModule } from '../module/user.module';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  AllDoctorUrl : string = "http://localhost/FindMyDoctor/AllDoctors.php";
  AppointmentUrl : string = "http://localhost/FindMyDoctor/RequestAppointment.php";
  MyAppointmentUrl : string = "http://localhost/FindMyDoctor/MyAppointment.php";
  User:UserModule;
  constructor(private http : HttpClient) {
    this.User = <UserModule>JSON.parse(localStorage.getItem('currentUser'));
  }

  

  getAllDoctor(){
    return this.http.get<any>(this.AllDoctorUrl).pipe();
  }
  requestAppointment(Doctor_Mobile:string,Date_Time:string){
    let body = new FormData();
    body.append('User_Mobile', this.User.Mobile);
    body.append('Doctor_Mobile', Doctor_Mobile);
    body.append('Date_Time', Date_Time);
    return this.http.post<any>(this.AppointmentUrl,body).pipe();
  }
  myAppointment(){
    let body = new FormData();
    body.append('User_Mobile', this.User.Mobile);
    return this.http.post<any>(this.MyAppointmentUrl,body).pipe();
  }
}
