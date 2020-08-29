import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DoctorModule } from '../module/doctor.module';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  
  HostUrl = environment.HostUrl;
  DoctorRegistrationRequestUrl : string = "/Doctor.php";
  setDoctorStatusUrl : string = "/SetDoctorStatus.php";
  addNotificationUrl : string = "/AddNotification.php";
  
  constructor(private http : HttpClient) {
   
  }
  
  getDoctorRequest(){
    return this.http.get<any>(this.HostUrl+this.DoctorRegistrationRequestUrl).pipe();
  }
  
  setDoctorStatus(Dr_Mobile:string,Status:string){
    let body = new FormData();
    body.append('Doctor_Mobile', Dr_Mobile);
    body.append('Status', Status);
    return this.http.post<any>(this.HostUrl+this.setDoctorStatusUrl,body).pipe();
  }
  
  addNotification(UserType:string,Text:string){
    let body = new FormData();
    body.append('UserType', UserType);
    body.append('Text', Text);
    return this.http.post<any>(this.HostUrl+this.addNotificationUrl,body).pipe();
  }
}
