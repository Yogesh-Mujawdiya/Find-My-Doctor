import { Injectable } from '@angular/core';
import { DoctorModule } from '../module/doctor.module';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  HostUrl = environment.HostUrl;
  MyAppointmentUrl : string = "/DoctorAppointment.php";
  ResponseAppointmentUrl : string = "/ResponseAppointment.php";
  Doctor:DoctorModule;
  constructor(private http : HttpClient) {
    this.Doctor = <DoctorModule>JSON.parse(localStorage.getItem('currentDoctor'));
  }

  getDoctor(){
    return this.Doctor;
  }

  myAppointment(){
    let body = new FormData();
    body.append('Mobile', this.Doctor.Mobile_No);
    return this.http.post<any>(this.HostUrl+this.MyAppointmentUrl,body).pipe();
  }
  
  ResponseAppointment(User_Mobile:string,Doctor_Mobile:string,Date_Time:string,Status:string){
    let body = new FormData();
    body.append('User_Mobile', User_Mobile);
    body.append('Doctor_Mobile', Doctor_Mobile);
    body.append('Date_Time', Date_Time);
    body.append('Status', Status);
    return this.http.post<any>(this.HostUrl+this.ResponseAppointmentUrl,body).pipe();
  }

}
